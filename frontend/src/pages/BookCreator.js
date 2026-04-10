import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';

function BookCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({ projectName: '', description: '', startTime: '', endTime: '', location: '' });

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await bookingAPI.createBooking(id, projectData);
      alert('Booked successfully!');
      navigate('/client-dashboard');
    } catch {
      alert('Booking failed.');
    }
  };

  return (
    <div className="container">
      <h2>Book Creator</h2>
      <form onSubmit={handleBook} style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px'}}>
        <input type="text" placeholder="Project Name" onChange={e => setProjectData({...projectData, projectName: e.target.value})} required />
        <input type="datetime-local" onChange={e => setProjectData({...projectData, startTime: e.target.value})} required />
        <input type="datetime-local" onChange={e => setProjectData({...projectData, endTime: e.target.value})} required />
        <button type="submit">Complete Booking</button>
      </form>
    </div>
  );
}
export default BookCreator;\n