import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import './Users.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  website: string;
}

type SortField = 'name' | 'company' | null;
type SortOrder = 'asc' | 'desc';

export function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(lowercasedTerm) || 
        user.email.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let valueA = sortField === 'name' ? a.name : a.company.name;
        let valueB = sortField === 'name' ? b.name : b.company.name;
        
        if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, searchTerm, sortField, sortOrder]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="sort-icon" />;
    return sortOrder === 'asc' ? <ArrowUp size={14} className="sort-icon" style={{ color: "var(--text-primary)" }} /> : <ArrowDown size={14} className="sort-icon" style={{ color: "var(--text-primary)" }} />;
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">Users Directory</h1>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-input-container">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
           <div className="loading-state">Loading users...</div>
        ) : error ? (
           <div className="error-state">Error: {error}</div>
        ) : (
          <>
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')} style={{ width: '28%' }}>
                      <div className="th-content">
                        User Name {getSortIcon('name')}
                      </div>
                    </th>
                    <th style={{ width: '28%' }}>Email Address</th>
                    <th style={{ width: '22%' }}>Contact Number</th>
                    <th onClick={() => handleSort('company')} style={{ width: '22%' }}>
                      <div className="th-content">
                        Company {getSortIcon('company')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedUsers.length > 0 ? (
                    filteredAndSortedUsers.map((user) => (
                      <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
                        <td>
                          <div className="user-name-cell">
                            <div className="user-initials">
                              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div>
                              <div>{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="user-email">{user.email}</td>
                        <td className="user-phone">{user.phone}</td>
                        <td>
                          <span className="company-badge">{user.company.name}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '3rem' }}>
                        No users found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>{filteredAndSortedUsers.length} of {users.length} row(s) available.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
