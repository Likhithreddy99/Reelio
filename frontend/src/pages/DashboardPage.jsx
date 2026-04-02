import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import api from '../api/axiosConfig';

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

export default DashboardPage;
