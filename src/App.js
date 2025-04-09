import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'; 
import RegisterStudentPage from './components/RegisterStudentPage';
import RegisterCompanyPage from './components/RegisterCompanyPage';
import StudentPage from './components/StudentPage';
import CompanyPage from './components/CompanyPage';
import AdminPage from './components/AdminPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register-student" element={<RegisterStudentPage />} />
                <Route path="/register-company" element={<RegisterCompanyPage />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;