import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Search from './pages/Search';
import Validate from './pages/Validate';
import Recommendations from './pages/Recommendations';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container mt-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
              <Route path="/validate" element={<PrivateRoute><Validate /></PrivateRoute>} />
              <Route path="/recommendations" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
            </Routes>
          </div>
          <footer className="footer-dark text-center py-4 bg-dark text-secondary mt-5">
            <p>Digital Knowledge Network © 2025</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
