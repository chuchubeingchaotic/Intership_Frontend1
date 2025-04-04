import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentPage from './components/StudentPage';
import CompanyPage from './components/CompanyPage';
import AdminPage from './components/AdminPage';
import './App.css';

const App = () => {
    const location = useLocation();
    const showHeaderFooter = !['/', '/register'].includes(location.pathname);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;