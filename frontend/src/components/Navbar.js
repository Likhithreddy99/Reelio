import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
const Navbar = () => {
 const { user, isAuthenticated, logout } = useAuth();
   return (
  <nav className="nav">
    <Link to="/" className="nav-brand">
       Reelio
     </Link>
      <ul className="nav-links">
          {isAuthenticated ? (
          <>
          <li>
               <Link to="/" className="nav-link">Home</Link>
            </li>
           {user?.role === 'CLIENT' && (
                <li>
                <Link to="/client-dashboard" className="nav-link">Dashboard</Link>
                </li>
           )}
             {user?.role === 'CREATOR' && (
            <li>
              <Link to="/creator-dashboard" className="nav-link">Dashboard</Link>
             </li>
          )}
           <li>
            <span className="nav-link">Welcome, {user?.name}</span>
             </li>
             <li>
               <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Logout
             </button>
              </li>
         </>
        ) : (
            <>
           <li>
             <Link to="/" className="nav-link">Home</Link>
            </li>
              <li>
               <Link to="/login" className="nav-link">Login</Link>
              </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
             </li>
         </>
       )}
       </ul>
    </nav>
);
};
export default Navbar;