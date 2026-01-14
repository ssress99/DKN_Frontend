import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">DKN</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav ms-auto">

                        {user && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>
                                {user.role === 'team_leader' && (
                                    <li className="nav-item"><Link className="nav-link" to="/validate">Validate</Link></li>
                                )}
                                <li className="nav-item"><Link className="nav-link" to="/recommendations">Recommendations</Link></li>
                            </>
                        )}

                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-light fw-bold">
                                        {user.username} ({user.role.replace('_', ' ')})
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm ms-2 mt-1" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
