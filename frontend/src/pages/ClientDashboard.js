import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { bookingAPI, creatorAPI } from '../services/api';
const ClientDashboard = () => {
 const [bookings, setBookings] = useState([]);
 const [creators, setCreators] = useState([]);
 const [loading, setLoading] = useState(true);
 const { user } = useAuth();
   useEffect(() => {
      const fetchData = async () => {
       try {
       const [bookingsResponse, creatorsResponse] = await Promise.all([
         bookingAPI.getClientBookings(),
           creatorAPI.getAllCreators()
      ]);
         setBookings(bookingsResponse.data);
       setCreators(creatorsResponse.data);
     } catch (error) {
       console.error('Error fetching data:', error);
      } finally {
       setLoading(false);
        }
   };
  fetchData();
    }, []);
    const getStatusBadge = (status) => {
   const statusClass = `status-badge status-${status.toLowerCase()}`;
  return <span className={statusClass}>{status}</span>;
  };
const handleCancelBooking = (bookingId) => {
  if (window.confirm('Are you sure you want to cancel this booking?')) {
        bookingAPI.updateBookingStatus(bookingId, 'CANCELLED')
          .then(() => {
           setBookings(bookings.map(booking =>
           booking.id === bookingId
                ? { ...booking, status: 'CANCELLED' }
              : booking
         ));
        })
      .catch(error => {
           console.error('Error cancelling booking:', error);
         alert('Failed to cancel booking');
      });
     }
   };
    if (loading) {
      return (
       <div className="fade-in-up" style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '1.2rem', color: 'white' }}>Loading your dashboard...</div>
       </div>
  );
 }
   return (
   <div className="fade-in-up">
       <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
       <h1>Client Dashboard</h1>
       <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
         Welcome back, <span style={{ fontWeight: 'bold' }}>{user?.name}</span>!
      </p>
        <div className="grid grid-cols-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link to="/book-creator" className="btn btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
             🎬 Book a Creator
          </Link>
            <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
              🔍 Browse Creators
          </Link>
       </div>
       </div>
       <section style={{ marginBottom: '3rem' }}>
          <h2>Your Bookings</h2>
       {bookings.length === 0 ? (
         <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
          <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>No Bookings Yet</h3>
            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
            Start by booking a creator for your next project!
              </p>
           <Link to="/book-creator" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Find Creators
           </Link>
        </div>
       ) : (
         <div>
            {bookings.map((booking, index) => (
             <div key={booking.id} className="card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="grid grid-cols-2">
                   <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{
                          width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                       justifyContent: 'center',
                         color: 'white',
                      fontSize: '1.2rem',
                          fontWeight: 'bold',
                        marginRight: '1rem'
                      }}>
                        {booking.creator.name.charAt(0).toUpperCase()}
                        </div>
                       <div>
                       <h3 className="card-title" style={{ margin: 0, fontSize: '1.3rem' }}>
                           {booking.projectName}
                        </h3>
                         <p style={{ color: '#718096', margin: 0 }}>
                          with {booking.creator.name}
                       </p>
                     </div>
                  </div>
                    <div style={{ textAlign: 'right' }}>
                    {getStatusBadge(booking.status)}
                      </div>
                   </div>
                    <div style={{ marginTop: '1.5rem' }}>
                    <div className="grid grid-cols-2">
                    <div>
                      <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                           <strong>📅 Start:</strong> {new Date(booking.startTime).toLocaleString()}
                        </p>
                      <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                           <strong>🏁 End:</strong> {new Date(booking.endTime).toLocaleString()}
                        </p>
                      </div>
                      <div>
                      {booking.location && (
                          <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                            <strong>📍 Location:</strong> {booking.location}
                          </p>
                         )}
                          {booking.description && (
                           <p style={{ color: '#4a5568' }}>
                              <strong>📝 Description:</strong> {booking.description}
                        </p>
                          )}
                     </div>
                      </div>
                </div>
                   {booking.status === 'PENDING' && (
                      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                    <button
                      className="btn btn-secondary"
                        onClick={() => handleCancelBooking(booking.id)}
                        style={{ backgroundColor: '#ff6b6b' }}
                       >
                          Cancel Booking
                      </button>
                   </div>
                 )}
               </div>
                 </div>
              ))}
          </div>
       )}
    </section>
    <section>
        <h2>Discover More Creators</h2>
       <div className="grid grid-cols-3">
            {creators.slice(0, 6).map((creator, index) => (
             <div key={creator.id} className="card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{
                  width: '40px',
                height: '40px',
                  borderRadius: '50%',
                 background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                  justifyContent: 'center',
                   color: 'white',
                fontSize: '1rem',
                 fontWeight: 'bold',
                marginRight: '0.75rem'
                  }}>
                {creator.name.charAt(0).toUpperCase()}
               </div>
                 <div>
                  <h4 style={{ margin: 0, color: '#2d3748', fontSize: '1.1rem' }}>
                    {creator.name}
                    </h4>
                 <p style={{ margin: 0, color: '#718096', fontSize: '0.85rem' }}>
                      Creator
                  </p>
                 </div>
              </div>
              <p style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '1rem' }}>
                 {creator.bio || 'Talented cinematographer ready to bring your vision to life'}
            </p>
                <Link
                  to={`/book-creator/${creator.id}`}
                 className="btn btn-primary"
              style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}
            >
                  Book Now
               </Link>
          </div>
            ))}
       </div>
    </section>
   </div>
 );
};
export default ClientDashboard;