import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const HomePage = () => {
    const [cinematographers, setCinematographers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCinematographers = async () => {
            try {
                const response = await api.get('/cinematographers');
                setCinematographers(response.data);
            } catch (error) {
                console.error("Error fetching cinematographers", error);
            }
        };
        fetchCinematographers();
    }, []);

    return (
        <Container>
            <div className="p-5 mb-4 bg-light rounded-3 text-center hero-section">
                <h1 className="display-5 fw-bold">Hire Top Cinematographers</h1>
                <p className="col-md-8 mx-auto fs-4">
                    Find the perfect match for your short-format video needs.
                </p>
            </div>
            
            <h2 className="mb-4">Available Cinematographers</h2>
            <Row xs={1} md={3} className="g-4">
                {cinematographers.map((c) => (
                    <Col key={c.id}>
                        <Card className="h-100 shadow-sm cinematographer-card">
                            <Card.Body>
                                <Card.Title>{c.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{c.city} • ${c.hourlyRate}/hr</Card.Subtitle>
                                <Card.Text>
                                    {c.bio ? c.bio.substring(0, 100) + '...' : 'No bio available'}
                                </Card.Text>
                                <div>
                                    <small className="text-muted d-block mb-3">Specialties: {c.specialties || 'None listed'}</small>
                                </div>
                                <Button variant="primary" onClick={() => navigate(`/book/${c.id}`)}>Book Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
