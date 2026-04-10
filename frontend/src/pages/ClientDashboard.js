import React, { useState, useEffect } from 'react';
import { bookingAPI, creatorAPI } from '../services/api';
import { Link } from 'react-router-dom';

function ClientDashboard() {
  const [bookings, setBookings] = useState([]);
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    bookingAPI.getClientBookings().then(res => setBookings(res.data)).catch(() => {});
    creatorAPI.getAllCreators().then(res => setCreators(res.data)).catch(() => {});
  }, []);

  return (
    <div className="container">
      <h2>Your Dashboard</h2>
      <h3>Bookings</h3>
      {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map(b => (
        <div key={b.id} className="card">
          <p>Project: {b.projectName} | Status: {b.status}</p>
        </div>
      ))}
      <h3>Available Creators</h3>
      {creators.map(c => (
        <div key={c.id} className="card">
          <p>{c.name}</p>
          <Link to={`/book-creator/${c.id}`}><button>Book</button></Link>
        </div>
      ))}
    </div>
  );
}
export default ClientDashboard;\n