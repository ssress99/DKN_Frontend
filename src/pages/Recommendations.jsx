import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendations = () => {
    const [recs, setRecs] = useState([]);

    useEffect(() => {
        const fetchRecs = async () => {
            try {
                const res = await axios.get('/recommendations');
                setRecs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecs();
    }, []);

    return (
        <div>
            <div className="text-center mb-5">
                <h2 className="fw-bold">Recommended for You</h2>
                <p className="text-muted">Based on your activity and areas of interest.</p>
            </div>

            <div className="row g-4">
                {recs.map(item => (
                    <div key={item.id} className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title fw-bold text-primary">{item.title}</h5>
                                <p className="card-text text-muted">{item.description}</p>
                                <div className="mt-3">
                                    <span className="badge bg-light text-dark border me-2">{item.tags}</span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                                <small className="text-muted">By Author #{item.author_id}</small>
                                <a href={`http://localhost:5000/static/uploads/${item.filename}`} className="btn btn-sm btn-outline-primary">View</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
