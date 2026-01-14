import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Validate = () => {
    const [pendingItems, setPendingItems] = useState([]);
    const [comments, setComments] = useState({});

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const res = await axios.get('/validate');
            setPendingItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDecision = async (itemId, decision) => {
        try {
            await axios.post('/validate', {
                item_id: itemId,
                decision: decision,
                comments: comments[itemId] || ''
            });
            fetchPending(); // Refresh list
        } catch (err) {
            alert('Error processing validation');
        }
    };

    return (
        <div>
            <h2 className="mb-4">Pending Validations</h2>
            {pendingItems.length === 0 ? (
                <div className="alert alert-info">No items pending validation.</div>
            ) : (
                <div className="table-responsive bg-white shadow-sm rounded p-3">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Item</th>
                                <th>Author (ID)</th>
                                <th>Submitted At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingItems.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>{item.title}</strong><br />
                                        <small>{item.description}</small>
                                        <div className="mt-1">
                                            {item.filename && <a href={`http://localhost:5000/static/uploads/${item.filename}`} className="text-decoration-none me-2" target="_blank" rel="noreferrer">View File</a>}
                                        </div>
                                    </td>
                                    <td>{item.author_id}</td>
                                    <td>{item.created_at?.split('T')[0]}</td>
                                    <td style={{ minWidth: '250px' }}>
                                        <textarea
                                            className="form-control mb-2"
                                            placeholder="Comments..."
                                            rows="1"
                                            value={comments[item.id] || ''}
                                            onChange={(e) => setComments({ ...comments, [item.id]: e.target.value })}
                                        ></textarea>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-success btn-sm flex-grow-1" onClick={() => handleDecision(item.id, 'approved')}>Approve</button>
                                            <button className="btn btn-danger btn-sm flex-grow-1" onClick={() => handleDecision(item.id, 'rejected')}>Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Validate;
