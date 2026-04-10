import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingAPI, creatorAPI } from '../services/api';
const BookCreator = () => {
 const { id: creatorId } = useParams();
    const navigate = useNavigate();
const [creator, setCreator] = useState(null);
  const [formData, setFormData] = useState({
  creatorId: parseInt(creatorId),
   startTime: '',
     endTime: '',
      projectName: '',
   description: '',
    location: ''
 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
   useEffect(() => {
  const fetchCreator = async () => {
     try {
      const response = await creatorAPI.getCreatorProfile(creatorId);
          setCreator(response.data);
     } catch (error) {
      console.error('Error fetching creator:', error);
       setError('Creator not found');
    }
    };
     fetchCreator();
  }, [creatorId]);
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
        await bookingAPI.createBooking(formData);
    alert('Booking request sent successfully!');
       navigate('/client-dashboard');
    } catch (error) {
     setError(error.response?.data || 'Failed to create booking');
      } finally {
        setLoading(false);
    }
};
    if (!creator && !error) {
   return <div>Loading...</div>;
 }
   if (error) {
      return <div style={{ color: 'red' }}>{error}</div>;
  }
  return (
    <div>
     <h1>Book Creator</h1>
        {creator && (
        <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>{creator.user.name}</h2>
         <p><strong>Specialization:</strong> {creator.specialization || 'Not specified'}</p>
            <p><strong>Hourly Rate:</strong> ${creator.hourlyRate || 'Contact for pricing'}</p>
            <p><strong>Equipment:</strong> {creator.equipment || 'Not specified'}</p>
         </div>
       )}
     <div className="form-container">
          <h2>Booking Details</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
          <div className="form-group">
             <label className="form-label">Project Name:</label>
            <input
              type="text"
            name="projectName"
              value={formData.projectName}
               onChange={handleChange}
             className="form-input"
              required
             />
            </div>
         <div className="form-group">
           <label className="form-label">Start Time:</label>
            <input
            type="datetime-local"
            name="startTime"
             value={formData.startTime}
            onChange={handleChange}
            className="form-input"
               required
            min={new Date().toISOString().slice(0, 16)}
          />
          </div>
            <div className="form-group">
              <label className="form-label">End Time:</label>
              <input
             type="datetime-local"
             name="endTime"
            value={formData.endTime}
                onChange={handleChange}
              className="form-input"
              required
                min={formData.startTime || new Date().toISOString().slice(0, 16)}
          />
            </div>
            <div className="form-group">
            <label className="form-label">Location:</label>
             <input
               type="text"
              name="location"
            value={formData.location}
               onChange={handleChange}
            className="form-input"
              />
          </div>
           <div className="form-group">
             <label className="form-label">Description:</label>
          <textarea
                name="description"
               value={formData.description}
            onChange={handleChange}
              className="form-input"
               rows="4"
                placeholder="Describe your project requirements..."
             />
            </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Booking Request'}
           </button>
         </form>
        </div>
     <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Booking Policy</h3>
         <p>Please note that creators require a 1-hour buffer before and after each booking. This means:</p>
      <ul>
            <li>If you book from 2:00 PM to 4:00 PM, the creator will be unavailable from 1:00 PM to 5:00 PM</li>
           <li>This buffer ensures proper setup, breakdown, and travel time</li>
         <li>Conflicting bookings will not be allowed</li>
        </ul>
     </div>
      </div>
    );
};
export default BookCreator;