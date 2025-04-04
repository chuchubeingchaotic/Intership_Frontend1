import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSinhVien, registerDoanhNghiep } from '../services/api';
import '../App.css';

const Register = () => {
    const [role, setRole] = useState('SinhVien');
    const [formData, setFormData] = useState({
        hoTen: '',
        maSV: '',
        lop: '',
        sdt: '',
        gpa: '',
        tenDN: '',
        diaChi: '',
        email: '',
        matKhau: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (role === 'SinhVien') {
                await registerSinhVien({
                    hoTen: formData.hoTen,
                    maSV: formData.maSV,
                    lop: formData.lop,
                    sdt: formData.sdt,
                    gpa: parseFloat(formData.gpa),
                    email: formData.email,
                    matKhau: formData.matKhau,
                });
            } else {
                await registerDoanhNghiep({
                    tenDN: formData.tenDN,
                    diaChi: formData.diaChi,
                    soDT: formData.sdt,
                    email: formData.email,
                    matKhau: formData.matKhau,
                });
            }
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/');
        } catch (error) {
            alert('Đăng ký thất bại: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="auth-page">
            <div className="register-container">
                <h2>Đăng ký</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Vai trò</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="SinhVien">Sinh viên</option>
                            <option value="DoanhNghiep">Doanh nghiệp</option>
                        </select>
                    </div>
                    {role === 'SinhVien' ? (
                        <>
                            <div className="form-group">
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    name="hoTen"
                                    value={formData.hoTen}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mã sinh viên</label>
                                <input
                                    type="text"
                                    name="maSV"
                                    value={formData.maSV}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Lớp</label>
                                <input
                                    type="text"
                                    name="lop"
                                    value={formData.lop}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="sdt"
                                    value={formData.sdt}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>GPA</label>
                                <input
                                    type="number"
                                    name="gpa"
                                    value={formData.gpa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label>Tên doanh nghiệp</label>
                                <input
                                    type="text"
                                    name="tenDN"
                                    value={formData.tenDN}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    name="diaChi"
                                    value={formData.diaChi}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="sdt"
                                    value={formData.sdt}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="matKhau"
                            value={formData.matKhau}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Đăng ký</button>
                    <p>
                        Đã có tài khoản?{' '}
                        <span
                            style={{ color: '#1a3c6d', cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            Đăng nhập
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;