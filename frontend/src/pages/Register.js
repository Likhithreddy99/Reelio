import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { authAPI } from '../services/api';
const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
   email: '',
   password: '',
  role: 'CLIENT',
  phone: '',
      bio: ''
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
       const response = await authAPI.register(formData);
    const { token, role, name, userId } = response.data;
    login(token, { role, name, userId });
     navigate(role === 'CREATOR' ? '/creator-dashboard' : '/client-dashboard');
  } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
     } finally {
      setLoading(false);
      }
   };
return (
     <div className="fade-in-up">
     <div className="form-container">
       <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎥</div>
            <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Join Reelio</h2>
        <p style={{ color: '#718096', margin: 0 }}>Create your account and start creating</p>
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
            <label className="form-label">Full Name</label>
          <input
              type="text"
              name="name"
              value={formData.name}
             onChange={handleChange}
              className="form-input"
               placeholder="Enter your full name"
                required
              />
         </div>
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
             placeholder="Create a password"
            required
              />
         </div>
          <div className="form-group">
            <label className="form-label">I am a...</label>
             <select
               name="role"
              value={formData.role}
                onChange={handleChange}
               className="form-input"
               required
           >
             <option value="CLIENT">Client (looking to hire creators)</option>
               <option value="CREATOR">Creator (cinematographer)</option>
             </select>
            </div>
          <div className="form-group">
           <label className="form-label">Phone Number (optional)</label>
            <input
            type="tel"
              name="phone"
             value={formData.phone}
                onChange={handleChange}
              className="form-input"
                placeholder="Enter your phone number"
              />
          </div>
        <div className="form-group">
          <label className="form-label">Bio (optional)</label>
              <textarea
             name="bio"
               value={formData.bio}
               onChange={handleChange}
              className="form-input"
              rows="3"
                placeholder="Tell us about yourself..."
             />
        </div>
           <button
          type="submit"
            className="btn btn-primary"
              disabled={loading}
             style={{ width: '100%', marginBottom: '1rem' }}
        >
           {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        </form>
      <div style={{ textAlign: 'center', color: '#718096' }}>
            Already have an account?{' '}
           <Link
           to="/login"
             style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
          >
           Sign in here
          </Link>
      </div>
     </div>
   </div>
);
};
export default Register;