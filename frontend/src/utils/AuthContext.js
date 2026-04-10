import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
    if (!context) {
  throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
};
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(localStorage.getItem('token'));
   useEffect(() => {
  if (token) {
     const userData = localStorage.getItem('user');
        if (userData) {
       setUser(JSON.parse(userData));
       }
      }
    }, [token]);
  const login = (token, userData) => {
   localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
      setToken(token);
   setUser(userData);
 };
    const logout = () => {
    localStorage.removeItem('token');
     localStorage.removeItem('user');
   setToken(null);
   setUser(null);
  };
 const value = {
      user,
  token,
   login,
      logout,
  isAuthenticated: !!token
};
    return (
   <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    );
};