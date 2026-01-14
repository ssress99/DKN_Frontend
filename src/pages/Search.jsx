import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(query);

    useEffect(() => {
        fetchResults();
    }, [query]);

    const fetchResults = async () => {
        try {
            const res = await axios.get(`/search?q=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: searchTerm });
    };

    return (
        <div>
            <div className="mb-4">
                <form onSubmit={handleSearch} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>

            <div className="list-group">
                {results.length > 0 ? (
                    results.map(item => (
                        <div key={item.id} className="list-group-item list-group-item-action p-4 border rounded shadow-sm mb-3">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 text-primary fw-bold">{item.title}</h5>
                                <small className={`badge ${item.status === 'approved' ? 'bg-success' : item.status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                    {item.status.toUpperCase()}
                                </small>
                            </div>
                            <p className="mb-2 mt-2">{item.description}</p>
                            <small className="text-muted">Tags: {item.tags}</small>
                            <div className="mt-3">
                                {item.filename && (
                                    <a href={`http://localhost:5000/static/uploads/${item.filename}`} className="btn btn-sm btn-outline-dark me-2" download>Download File</a>
                                )}
                                {item.project_link && (
                                    <a href={item.project_link} className="btn btn-sm btn-outline-primary" target="_blank" rel="noreferrer">View Project</a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
