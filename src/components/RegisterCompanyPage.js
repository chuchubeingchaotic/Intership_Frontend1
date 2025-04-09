import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDoanhNghiep } from '../services/api'; // Sửa đường dẫn
import '../App.css'; // Đúng đường dẫn

const RegisterCompanyPage = () => {
    const [tenDN, setTenDN] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDT, setSoDT] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDoanhNghiep({ tenDN, diaChi, soDT, email, matKhau });
            alert('Đăng ký doanh nghiệp thành công!');
            navigate('/');
        } catch (error) {
            alert('Đăng ký thất bại: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="auth-page">
            <div className="register-container">
            <h2>Đăng ký Doanh Nghiệp</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên Doanh Nghiệp</label>
                    <input
                        type="text"
                        value={tenDN}
                        onChange={(e) => setTenDN(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Địa Chỉ</label>
                    <input
                        type="text"
                        value={diaChi}
                        onChange={(e) => setDiaChi(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Số Điện Thoại</label>
                    <input
                        type="text"
                        value={soDT}
                        onChange={(e) => setSoDT(e.target.value)}
                        required
                    />
                </div>
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
                    <label>Mật Khẩu</label>
                    <input
                        type="password"
                        value={matKhau}
                        onChange={(e) => setMatKhau(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
            <p>
                Đã có tài khoản? <a href="/">Đăng nhập</a>
            </p>
        </div>
        </div>
        
    );
};

export default RegisterCompanyPage;