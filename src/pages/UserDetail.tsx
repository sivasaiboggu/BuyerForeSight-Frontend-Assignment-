import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Building, MapPin } from 'lucide-react';
import './UserDetail.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error('User not found');
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="loading-state">Loading user profile...</div>;
  }

  if (error || !user) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <Link to="/users" className="back-button" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="user-detail-page">
      <Link to="/users" className="back-button">
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      <div className="profile-header">
        <div className="profile-avatar-large">
          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div className="profile-title">
          <h1>{user.name}</h1>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className="details-grid">
        {/* Contact Info Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <Mail size={18} className="detail-card-icon" />
            Contact Information
          </div>
          <div className="detail-card-body">
            <div className="info-group">
              <div className="info-label">Email</div>
              <div className="info-value">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
            </div>
            <div className="info-group">
              <div className="info-label">Phone</div>
              <div className="info-value">
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </div>
            </div>
            <div className="info-group">
              <div className="info-label">Website</div>
              <div className="info-value">
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <Building size={18} className="detail-card-icon" />
            Company details
          </div>
          <div className="detail-card-body">
            <div className="info-group">
              <div className="info-label">Name</div>
              <div className="info-value">{user.company.name}</div>
            </div>
            <div className="info-group">
              <div className="info-label">Catch Phrase</div>
              <div className="info-value" style={{ fontStyle: 'italic' }}>"{user.company.catchPhrase}"</div>
            </div>
            <div className="info-group">
              <div className="info-label">Business Strategy</div>
              <div className="info-value">{user.company.bs}</div>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <MapPin size={18} className="detail-card-icon" />
            Address
          </div>
          <div className="detail-card-body">
            <div className="info-group">
              <div className="info-label">Street</div>
              <div className="info-value">{user.address.street}, {user.address.suite}</div>
            </div>
            <div className="info-group">
              <div className="info-label">City</div>
              <div className="info-value">{user.address.city}</div>
            </div>
            <div className="info-group">
              <div className="info-label">Zipcode</div>
              <div className="info-value">{user.address.zipcode}</div>
            </div>
            <div className="info-group" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <div className="info-label">Coordinates</div>
              <div className="info-value">Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
