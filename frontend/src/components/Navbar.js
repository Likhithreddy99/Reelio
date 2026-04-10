import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to="/">Reelio</Link>
      {user ? (
        <>
          <Link to={user.role === 'CREATOR' ? "/creator-dashboard" : "/client-dashboard"}>Dashboard</Link>
          <button onClick={logout}>Logout ({user.name})</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
export default Navbar;\n