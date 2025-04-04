import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Thay thế bằng link ảnh logo của bạn
const logoUrl = 'https://via.placeholder.com/40'; // Placeholder logo

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-left">
                <img src="https://i.pinimg.com/474x/0c/3b/a6/0c3ba6df9e70c306dc610829b6018578.jpg" alt="Logo" className="header-logo" />
                <h1>Hệ thống quản lý đăng ký thực tập</h1>
            </div>
            <div className="header-right">
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
        </header>
    );
};

export default Header;