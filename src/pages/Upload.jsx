import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('project_link', projectLink);
        if (file) formData.append('file', file);

        try {
            await axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ type: 'success', text: 'Upload successful!' });
            setTitle(''); setDescription(''); setTags(''); setProjectLink(''); setFile(null);
        } catch (err) {
            setMessage({ type: 'danger', text: 'Upload failed.' });
        }
    };

    return (
        <div className="card shadow-sm p-4">
            <h2 className="mb-4">Upload Knowledge Asset</h2>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tags (comma separated)</label>
                        <input type="text" className="form-control" placeholder="e.g. process, template, finance" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Project Link (Optional)</label>
                        <input type="url" className="form-control" placeholder="https://..." value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Attach File</label>
                    <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button type="submit" className="btn btn-primary px-4">Submit Item</button>
            </form>
        </div>
    );
};

export default Upload;
