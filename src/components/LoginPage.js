import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Sửa đường dẫn
import '../App.css'; // Đúng đường dẫn

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, matKhau: password });
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', email);
            localStorage.setItem('role', response.role);

            if (response.role === 'SinhVien') {
                navigate('/student');
            } else if (response.role === 'DoanhNghiep') {
                navigate('/company');
            } else if (response.role === 'Admin') {
                navigate('/admin');
            }
        } catch (error) {
            alert('Đăng nhập thất bại: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="auth-page">
            <div className="login-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
            <p>
                Bạn chưa có tài khoản? <a href="/register-student">Đăng ký sinh viên</a> hoặc{' '}
                <a href="/register-company">Đăng ký doanh nghiệp</a>
            </p>
        </div>
        </div>
        
    );
};

export default LoginPage;