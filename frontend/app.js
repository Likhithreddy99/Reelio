
// --- Globals ---
const { useState, useEffect, createContext, useContext } = React;
const { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, useParams } = ReactRouterDOM;
const { Container, Navbar, Nav, Button, Form, Card, Badge, Alert, Row, Col, Spinner, Modal } = ReactBootstrap;


// ===== api/axiosConfig.js =====
axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Request Interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



// ===== context/AuthContext.jsx =====
React, { createContext, useState, useEffect } from 'react';
{jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // In a real app we might want to check expiration
                setUser({
                    email: decoded.sub,
                    role: decoded.role,
                });
            } catch (err) {
                console.error('Invalid token');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({
            email: decoded.sub,
            role: decoded.role,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


// ===== components/Navbar.jsx =====
React, { useContext } from 'react';
{ Link, useNavigate } from 'react-router-dom';
{ AuthContext } from '../context/AuthContext';
{ Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">Reelio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/search">Search</Nav.Link>
                        {user?.role === 'CINEMATOGRAPHER' && (
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        )}
                        {user?.role === 'CLIENT' && (
                            <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Navbar.Text className="me-3">
                                    Signed in as: {user.email} ({user.role})
                                </Navbar.Text>
                                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};



// ===== components/ProtectedRoute.jsx =====
React, { useContext } from 'react';
{ Navigate } from 'react-router-dom';
{ AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};



// ===== pages/HomePage.jsx =====
React, { useState, useEffect } from 'react';
{ Container, Row, Col, Card, Button } from 'react-bootstrap';
{ useNavigate } from 'react-router-dom';
api from '../api/axiosConfig';

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



// ===== pages/LoginPage.jsx =====
React, { useState, useContext } from 'react';
{ Container, Form, Button, Card, Alert } from 'react-bootstrap';
{ useNavigate } from 'react-router-dom';
api from '../api/axiosConfig';
{ AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Card style={{ width: '400px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};



// ===== pages/RegisterPage.jsx =====
React, { useState, useContext } from 'react';
{ Container, Form, Button, Card, Alert } from 'react-bootstrap';
{ useNavigate } from 'react-router-dom';
api from '../api/axiosConfig';
{ AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CLIENT');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { name, email, password, role });
            login(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Card style={{ width: '400px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="CLIENT">Client</option>
                                <option value="CINEMATOGRAPHER">Cinematographer</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};



// ===== pages/DashboardPage.jsx =====
React, { useState, useEffect } from 'react';
{ Container, Table, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
api from '../api/axiosConfig';

const DashboardPage = () => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings/my-schedule');
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
            fetchBookings();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <Container>
            <h2 className="mb-4">My Dashboard (Schedule)</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Client</th>
                        <th>Location</th>
                        <th>Event Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((b) => (
                        <tr key={b.id}>
                            <td>{b.bookingDate}</td>
                            <td>{b.startTime} - {b.endTime}</td>
                            <td>{b.clientName}</td>
                            <td>{b.location}</td>
                            <td>{b.eventType}</td>
                            <td>
                                <Badge bg={b.status === 'CONFIRMED' ? 'success' : b.status === 'CANCELLED' ? 'danger' : 'warning'}>
                                    {b.status}
                                </Badge>
                            </td>
                            <td>
                                {b.status === 'PENDING' && (
                                    <DropdownButton id="dropdown-basic-button" title="Action" size="sm" variant="secondary">
                                        <Dropdown.Item onClick={() => handleStatusChange(b.id, 'CONFIRMED')}>Confirm</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange(b.id, 'CANCELLED')} className="text-danger">Reject</Dropdown.Item>
                                    </DropdownButton>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};



// ===== pages/BookingPage.jsx =====
React, { useState } from 'react';
{ Container, Form, Button, Alert, Card } from 'react-bootstrap';
{ useParams, useNavigate } from 'react-router-dom';
api from '../api/axiosConfig';

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



// ===== pages/SearchPage.jsx =====
React, { useState } from 'react';
{ Container, Form, Button, InputGroup, Row, Col, Card } from 'react-bootstrap';
{ useNavigate } from 'react-router-dom';
api from '../api/axiosConfig';

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



// ===== App.jsx =====
React from 'react';
{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';
NavigationBar from './components/Navbar';
HomePage from './pages/HomePage';
LoginPage from './pages/LoginPage';
RegisterPage from './pages/RegisterPage';
DashboardPage from './pages/DashboardPage';
BookingPage from './pages/BookingPage';
SearchPage from './pages/SearchPage';
ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['CINEMATOGRAPHER']}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/book/:id" 
          element={
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}



// ===== main.jsx =====
React from 'react'
ReactDOM from 'react-dom/client'
App from './App.jsx'
'bootstrap/dist/css/bootstrap.min.css';
'./index.css'
{ AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)


