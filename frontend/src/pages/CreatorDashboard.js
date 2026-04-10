import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';

function CreatorDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    bookingAPI.getCreatorBookings().then(res => setBookings(res.data)).catch(() => {});
  }, []);

  return (
    <div className="container">
      <h2>Creator Dashboard</h2>
      <h3>Your Bookings</h3>
      {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map(b => (
        <div key={b.id} className="card">
          <p>Project: {b.projectName} | Client: {b.client.name} | Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}
export default CreatorDashboard;\n