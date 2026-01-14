import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:5000/api';

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await axios.get('/check-auth');
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        const res = await axios.post('/login', { username, password });
        setUser(res.data.user);
        return res.data;
    };

    const register = async (username, password, role) => {
        const res = await axios.post('/register', { username, password, role });
        await checkAuth(); // refresh session
        return res.data;
    };

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
