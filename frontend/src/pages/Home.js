import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { creatorAPI } from '../services/api';
const Home = () => {
  const [creators, setCreators] = useState([]);
 const [loading, setLoading] = useState(true);
useEffect(() => {
     const fetchCreators = async () => {
    try {
      const response = await creatorAPI.getAvailableCreators();
         setCreators(response.data);
     } catch (error) {
         console.error('Error fetching creators:', error);
        } finally {
         setLoading(false);
    }
  };
      fetchCreators();
}, []);
   if (loading) {
     return (
      <div className="fade-in-up" style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '1.2rem', color: 'white' }}>Loading amazing creators...</div>
    </div>
    );
   }
    return (
      <div className="fade-in-up">
       <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
         <h1>Reelio</h1>
         <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
          Discover talented cinematographers and bring your creative vision to life.
        Book professionals for reels, short films, and video content.
       </p>
    </div>
     <section style={{ marginBottom: '3rem' }}>
      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
             <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Professional Creators</h3>
              <p style={{ color: '#4a5568' }}>Verified cinematographers with proven expertise</p>
            </div>
         <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Easy Booking</h3>
              <p style={{ color: '#4a5568' }}>Simple scheduling with conflict prevention</p>
         </div>
           <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
           <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Quality Content</h3>
            <p style={{ color: '#4a5568' }}>Create stunning videos that stand out</p>
        </div>
       </div>
        </section>
       <section>
      <h2>Featured Creators</h2>
        {creators.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
           <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎥</div>
          <p style={{ color: '#4a5568' }}>No creators available at the moment. Check back soon!</p>
            </div>
      ) : (
        <div className="grid grid-cols-3">
              {creators.map((profile, index) => (
              <div key={profile.id} className="card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                 <div style={{
                      width: '60px',
                     height: '60px',
                    borderRadius: '50%',
                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                   display: 'flex',
                  alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  fontSize: '1.5rem',
                   fontWeight: 'bold',
                    marginRight: '1rem'
                    }}>
                     {profile.user.name.charAt(0).toUpperCase()}
                  </div>
                <div>
                   <h3 className="card-title" style={{ margin: 0, fontSize: '1.2rem' }}>
                        {profile.user.name}
                      </h3>
                      <p style={{ color: '#718096', margin: 0, fontSize: '0.9rem' }}>
                     {profile.specialization || 'Cinematographer'}
                   </p>
                   </div>
                 </div>
               <div style={{ marginBottom: '1.5rem' }}>
                  {profile.experience && (
                     <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                     <strong>Experience:</strong> {profile.experience}
                      </p>
                  )}
                {profile.hourlyRate && (
                      <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                        <strong>Rate:</strong> <span style={{ color: '#667eea', fontWeight: 'bold' }}>${profile.hourlyRate}/hr</span>
                      </p>
                  )}
                 {profile.equipment && (
                     <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                     <strong>Equipment:</strong> {profile.equipment}
                  </p>
                  )}
              </div>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                    to={`/creator/${profile.user.id}`}
                     className="btn btn-secondary"
                      style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                  >
                      View Profile
                    </Link>
                 <Link
                   to={`/book-creator/${profile.user.id}`}
                      className="btn btn-primary"
                  style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                   >
                      Book Now
                 </Link>
                 </div>
            </div>
             ))}
        </div>
      )}
     </section>
   </div>
 );
};
export default Home;