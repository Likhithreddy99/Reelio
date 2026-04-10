import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { authAPI } from '../services/api';
const Login = () => {
 const [formData, setFormData] = useState({
      email: '',
   password: ''
  });
 const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
const navigate = useNavigate();
   const { login } = useAuth();
const handleChange = (e) => {
    setFormData({
        ...formData,
      [e.target.name]: e.target.value
  });
    };
   const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
  setError('');
     try {
        const response = await authAPI.login(formData);
       const { token, role, name, userId } = response.data;
      login(token, { role, name, userId });
    navigate(role === 'CREATOR' ? '/creator-dashboard' : '/client-dashboard');
      } catch (error) {
     setError('Invalid email or password');
      } finally {
     setLoading(false);
      }
};
  return (
     <div className="fade-in-up">
      <div className="form-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
        <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: '#718096', margin: 0 }}>Sign in to your Reelio account</p>
      </div>
       {error && (
          <div style={{
              backgroundColor: '#fed7d7',
             color: '#c53030',
             padding: '1rem',
             borderRadius: '8px',
           marginBottom: '1rem',
             border: '1px solid #feb2b2'
        }}>
          {error}
         </div>
         )}
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <label className="form-label">Email Address</label>
           <input
               type="email"
            name="email"
              value={formData.email}
             onChange={handleChange}
            className="form-input"
                placeholder="Enter your email"
               required
           />
          </div>
         <div className="form-group">
             <label className="form-label">Password</label>
          <input
              type="password"
               name="password"
              value={formData.password}
             onChange={handleChange}
             className="form-input"
             placeholder="Enter your password"
                required
           />
            </div>
         <button
            type="submit"
           className="btn btn-primary"
             disabled={loading}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
              {loading ? 'Signing in...' : 'Sign In'}
           </button>
      </form>
        <div style={{ textAlign: 'center', color: '#718096' }}>
           Don't have an account?{' '}
            <Link
           to="/register"
             style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
            >
            Sign up here
        </Link>
      </div>
    </div>
    </div>
);
};
export default Login;