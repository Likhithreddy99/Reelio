import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import CreatorDashboard from './pages/CreatorDashboard';
import CreatorProfile from './pages/CreatorProfile';
import BookCreator from './pages/BookCreator';
import './App.css';
function App() {
    return (
      <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
         <main className="main-content">
              <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            <Route path="/book-creator/:id" element={<BookCreator />} />
             </Routes>
            </main>
      </div>
     </Router>
      </AuthProvider>
  );
}
export default App;