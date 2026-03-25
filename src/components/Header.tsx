import { useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <header className="header">
      <div className="breadcrumb-section">
        <div className="breadcrumb">
          <span className="breadcrumb-item text-muted">Dashboard</span>
          {pathnames.length > 0 && pathnames[0] !== 'users' && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-item active" style={{ textTransform: 'capitalize' }}>
                {pathnames[0]}
              </span>
            </>
          )}
        </div>
      </div>
      
    </header>
  );
}
