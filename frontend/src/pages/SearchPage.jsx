import React, { useState } from 'react';
import { Container, Form, Button, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
            setResults(response.data);
        } catch (error) {
            console.error("Search failed", error);
        }
        setLoading(false);
    };

    return (
        <Container>
            <h2 className="mb-4 text-center">AI Powered Cinematographer Search</h2>
            <Row className="justify-content-center mb-5">
                <Col md={8}>
                    <Form onSubmit={handleSearch}>
                        <InputGroup size="lg">
                            <Form.Control
                                placeholder="E.g., I need someone in Los Angeles who does weddings"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Searching...' : 'Search'}
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>

            <Row xs={1} md={3} className="g-4">
                {results.map((c) => (
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
            {results.length === 0 && !loading && query && (
                <p className="text-center text-muted">No results found.</p>
            )}
        </Container>
    );
};

export default SearchPage;
