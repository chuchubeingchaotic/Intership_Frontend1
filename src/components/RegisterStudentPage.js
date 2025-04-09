import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSinhVien } from '../services/api'; // Sửa đường dẫn
import '../App.css'; // Đúng đường dẫn

const RegisterStudentPage = () => {
    const [hoTen, setHoTen] = useState('');
    const [maSV, setMaSV] = useState('');
    const [lop, setLop] = useState('');
    const [sdt, setSdt] = useState('');
    const [gpa, setGpa] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSinhVien({ hoTen, maSV, lop, sdt, gpa: parseFloat(gpa), email, matKhau });
            alert('Đăng ký sinh viên thành công!');
            navigate('/');
        } catch (error) {
            alert('Đăng ký thất bại: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="auth-page">
            <div className="register-container">
            <h2>Đăng ký Sinh Viên</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Họ Tên</label>
                    <input
                        type="text"
                        value={hoTen}
                        onChange={(e) => setHoTen(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mã Sinh Viên</label>
                    <input
                        type="text"
                        value={maSV}
                        onChange={(e) => setMaSV(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Lớp</label>
                    <input
                        type="text"
                        value={lop}
                        onChange={(e) => setLop(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Số Điện Thoại</label>
                    <input
                        type="text"
                        value={sdt}
                        onChange={(e) => setSdt(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>GPA</label>
                    <input
                        type="number"
                        step="0.1"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
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

export default RegisterStudentPage;