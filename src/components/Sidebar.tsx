import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
          BF
        </div>
        <div className="brand-text">
          <span className="brand-name" style={{ fontSize: '1.1rem' }}>BuyerForeSight</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-group">
          <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive || window.location.pathname === '/users' ? 'active' : ''}`}>
            Users Directory
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
