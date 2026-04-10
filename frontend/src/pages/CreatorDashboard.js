import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { bookingAPI, creatorAPI } from '../services/api';
const CreatorDashboard = () => {
   const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
   const { user } = useAuth();
    useEffect(() => {
      const fetchData = async () => {
    try {
         const [bookingsResponse, profileResponse] = await Promise.all([
         bookingAPI.getCreatorBookings(),
            creatorAPI.getCreatorProfile(user?.userId)
          ]);
       setBookings(bookingsResponse.data);
         setProfile(profileResponse.data);
       } catch (error) {
      console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
    }
  };
     if (user?.userId) {
     fetchData();
    }
  }, [user]);
  const getStatusColor = (status) => {
     switch (status) {
     case 'PENDING': return '#f39c12';
    case 'CONFIRMED': return '#27ae60';
        case 'CANCELLED': return '#e74c3c';
      case 'COMPLETED': return '#3498db';
       default: return '#95a5a6';
    }
};
 const handleUpdateBookingStatus = (bookingId, newStatus) => {
  bookingAPI.updateBookingStatus(bookingId, newStatus)
      .then(() => {
        setBookings(bookings.map(booking =>
            booking.id === bookingId
             ? { ...booking, status: newStatus }
              : booking
          ));
    })
      .catch(error => {
         console.error('Error updating booking status:', error);
          alert('Failed to update booking status');
     });
};
if (loading) {
   return <div>Loading...</div>;
}
 return (
     <div>
     <h1>Creator Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
        <section style={{ marginBottom: '2rem' }}>
         <h2>Profile Status</h2>
         {profile ? (
         <div className="card">
          <p><strong>Specialization:</strong> {profile.specialization || 'Not set'}</p>
          <p><strong>Hourly Rate:</strong> ${profile.hourlyRate || 'Not set'}</p>
             <p><strong>Available:</strong> {profile.available ? 'Yes' : 'No'}</p>
             <p><strong>Portfolio:</strong> {profile.portfolioUrl || 'Not set'}</p>
            </div>
        ) : (
           <div className="card">
           <p>You haven't set up your creator profile yet.</p>
             <p>Complete your profile to start receiving bookings!</p>
          </div>
         )}
     </section>
    <section>
         <h2>Your Bookings</h2>
         {bookings.length === 0 ? (
           <p>You don't have any bookings yet.</p>
         ) : (
        <div>
             {bookings.map((booking) => (
             <div key={booking.id} className="card">
                 <div className="grid grid-cols-2">
                  <div>
                   <h3 className="card-title">{booking.projectName}</h3>
                    <p><strong>Client:</strong> {booking.client.name}</p>
                   <p><strong>Start:</strong> {new Date(booking.startTime).toLocaleString()}</p>
                  <p><strong>End:</strong> {new Date(booking.endTime).toLocaleString()}</p>
                      {booking.location && <p><strong>Location:</strong> {booking.location}</p>}
                  {booking.description && <p><strong>Description:</strong> {booking.description}</p>}
                 </div>
                 <div>
                  <p>
                        <strong>Status:</strong>{' '}
                    <span style={{
                        color: getStatusColor(booking.status),
                        fontWeight: 'bold'
                        }}>
                        {booking.status}
                    </span>
                  </p>
                  {booking.status === 'PENDING' && (
                        <div style={{ marginTop: '1rem' }}>
                       <button
                         className="btn btn-primary"
                         onClick={() => handleUpdateBookingStatus(booking.id, 'CONFIRMED')}
                          style={{ marginRight: '0.5rem' }}
                        >
                         Accept
                        </button>
                        <button
                        className="btn btn-secondary"
                         onClick={() => handleUpdateBookingStatus(booking.id, 'CANCELLED')}
                       >
                           Decline
                      </button>
                        </div>
                     )}
                   {booking.status === 'CONFIRMED' && (
                       <div style={{ marginTop: '1rem' }}>
                       <button
                        className="btn btn-primary"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'COMPLETED')}
                       >
                         Mark Complete
                        </button>
                      </div>
                      )}
                  </div>
                </div>
               </div>
              ))}
           </div>
         )}
     </section>
  </div>
    );
};
export default CreatorDashboard;