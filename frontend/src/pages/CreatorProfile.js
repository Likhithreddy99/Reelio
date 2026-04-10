import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { creatorAPI } from '../services/api';
const CreatorProfile = () => {
    const { id: creatorId } = useParams();
   const [creator, setCreator] = useState(null);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
  const fetchCreator = async () => {
    try {
        const response = await creatorAPI.getCreatorProfile(creatorId);
       setCreator(response.data);
     } catch (error) {
        console.error('Error fetching creator:', error);
        } finally {
      setLoading(false);
        }
   };
  fetchCreator();
 }, [creatorId]);
if (loading) {
     return <div>Loading...</div>;
}
if (!creator) {
  return <div>Creator not found</div>;
  }
    return (
      <div>
     <Link to="/" style={{ marginBottom: '1rem', display: 'inline-block' }}>
       ← Back to Creators
     </Link>
     <div className="card">
       <h1>{creator.user.name}</h1>
          <p><strong>Email:</strong> {creator.user.email}</p>
         {creator.user.phone && <p><strong>Phone:</strong> {creator.user.phone}</p>}
        {creator.user.bio && <p><strong>Bio:</strong> {creator.user.bio}</p>}
          <hr style={{ margin: '2rem 0' }} />
         <h2>Professional Information</h2>
        {creator.specialization && (
            <p><strong>Specialization:</strong> {creator.specialization}</p>
        )}
          {creator.experience && (
           <p><strong>Experience:</strong> {creator.experience}</p>
         )}
         {creator.equipment && (
            <p><strong>Equipment:</strong> {creator.equipment}</p>
        )}
          {creator.hourlyRate && (
          <p><strong>Hourly Rate:</strong> ${creator.hourlyRate}</p>
        )}
        {creator.portfolioUrl && (
        <p><strong>Portfolio:</strong> <a href={creator.portfolioUrl} target="_blank" rel="noopener noreferrer">{creator.portfolioUrl}</a></p>
          )}
      <p><strong>Available for Bookings:</strong> {creator.available ? 'Yes' : 'No'}</p>
          {creator.available && (
         <div style={{ marginTop: '1rem' }}>
          <Link to={`/book-creator/${creator.user.id}`} className="btn btn-primary">
              Book This Creator
          </Link>
        </div>
        )}
       </div>
      {creator.blogContent && (
         <div className="card" style={{ marginTop: '2rem' }}>
         <h2>Blog & Portfolio</h2>
        <div style={{
           whiteSpace: 'pre-wrap',
             lineHeight: '1.6',
              fontSize: '1.1rem'
            }}>
              {creator.blogContent}
         </div>
        </div>
        )}
       <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Recent Work Showcase</h2>
      <div className="grid grid-cols-2">
            <div style={{
              backgroundColor: '#f8f9fa',
            padding: '2rem',
             textAlign: 'center',
            borderRadius: '4px'
         }}>
              <h3>Sample Project 1</h3>
              <p>Professional cinematography for commercial projects</p>
          </div>
           <div style={{
              backgroundColor: '#f8f9fa',
             padding: '2rem',
           textAlign: 'center',
           borderRadius: '4px'
           }}>
          <h3>Sample Project 2</h3>
             <p>Creative storytelling through visual media</p>
           </div>
          </div>
       <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#666' }}>
        Note: This is a demo. In a real application, creators would upload their actual work samples and portfolio pieces.
        </p>
       </div>
  </div>
    );
};
export default CreatorProfile;