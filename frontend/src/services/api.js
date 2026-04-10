import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api';
const api = axios.create({
  baseURL: API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
},
});
api.interceptors.request.use(
   (config) => {
    const token = localStorage.getItem('token');
  if (token) {
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
 },
(error) => {
    return Promise.reject(error);
   }
);
api.interceptors.response.use(
   (response) => response,
 (error) => {
    if (error.response?.status === 401) {
     localStorage.removeItem('token');
        localStorage.removeItem('user');
       window.location.href = '/login';
   }
  return Promise.reject(error);
}
);
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
 register: (userData) => api.post('/auth/register', userData),
};
export const creatorAPI = {
    getAllCreators: () => api.get('/creators'),
    getCreatorProfile: (userId) => api.get(`/creator-profiles/${userId}`),
    updateCreatorProfile: (profileData) => api.put('/creator-profiles', profileData),
  getAvailableCreators: () => api.get('/creator-profiles/available'),
};
export const bookingAPI = {
createBooking: (bookingData) => api.post('/bookings', bookingData),
  getClientBookings: () => api.get('/bookings/client'),
  getCreatorBookings: () => api.get('/bookings/creator'),
updateBookingStatus: (bookingId, status) => api.put(`/bookings/${bookingId}/status?status=${status}`),
};
export default api;