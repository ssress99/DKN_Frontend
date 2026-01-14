import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            {/* HERO SECTION */}
            <div className="hero text-center shadow-lg mb-5" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b)',
                color: 'white',
                padding: '130px 20px',
                borderRadius: '12px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h1 className="display-4 fw-bold">Digital Knowledge Network</h1>
                <p className="lead mt-3">A cloud-based platform that empowers Velion Dynamics to capture, validate, and utilise organisational knowledge.</p>
                <Link to="/upload" className="btn btn-light btn-lg mt-3">Start Uploading</Link>
            </div>

            {/* FEATURES SECTION */}
            <div className="text-center mb-5">
                <h2 className="fw-bold mb-4">Core Features</h2>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="card h-100 shadow-sm text-center p-4">
                        <h4 className="fw-bold">Upload</h4>
                        <p>Easily upload documents, templates and best practices to the shared repository.</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card h-100 shadow-sm text-center p-4">
                        <h4 className="fw-bold">Search</h4>
                        <p>Find knowledge assets using smart filtering and metadata.</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card h-100 shadow-sm text-center p-4">
                        <h4 className="fw-bold">Validate</h4>
                        <p>Governance teams ensure quality through structured validation workflows.</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card h-100 shadow-sm text-center p-4">
                        <h4 className="fw-bold">Recommendations</h4>
                        <p>Get AI-driven suggestions based on user activity and metadata.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
