import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [role, setRole] = useState('SinhVien');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, matKhau, role);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('email', email); // Lưu email để sử dụng trong trang Sinh viên
            if (role === 'SinhVien') navigate('/student');
            else if (role === 'DoanhNghiep') navigate('/company');
            else if (role === 'Admin') navigate('/admin');
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
                            value={matKhau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            required
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Vai trò</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="SinhVien">Sinh viên</option>
                            <option value="DoanhNghiep">Doanh nghiệp</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div> */}
                    <button type="submit">Đăng nhập</button>
                    <p>
                        Chưa có tài khoản?{' '}
                        <span
                            style={{ color: '#1a3c6d', cursor: 'pointer' }}
                            onClick={() => navigate('/register')}
                        >
                            Đăng ký
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;