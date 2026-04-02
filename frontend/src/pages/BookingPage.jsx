import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        cinematographerId: id,
        bookingDate: '',
        startTime: '',
        endTime: '',
        location: '',
        eventType: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/bookings', formData);
            setSuccess('Booking submitted successfully!');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError('Failed to book. Please check fields.');
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{ width: '600px' }} className="shadow">
                <Card.Body>
                    <h2 className="mb-4">Book Cinematographer</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Booking Date</Form.Label>
                            <Form.Control type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required />
                        </Form.Group>
                        <div className="d-flex gap-3 mb-3">
                            <Form.Group className="flex-fill">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="flex-fill">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Type</Form.Label>
                            <Form.Control type="text" name="eventType" value={formData.eventType} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Submit Request
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BookingPage;
