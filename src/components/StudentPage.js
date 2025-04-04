import React, { useState, useEffect } from 'react';
import { getDoanhNghiepsForDangKy, getDangKyThucTaps, createDangKyThucTap } from '../services/api';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const StudentPage = () => {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [dnId, setDnId] = useState('');
    const [doanhNghieps, setDoanhNghieps] = useState([]);
    const [dangKyThucTaps, setDangKyThucTaps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doanhNghiepData = await getDoanhNghiepsForDangKy();
                setDoanhNghieps(doanhNghiepData);

                const dangKyData = await getDangKyThucTaps();
                // Lọc các đăng ký của sinh viên hiện tại
                const filteredDangKy = dangKyData.filter(
                    (dk) => dk.sinhVien?.email === localStorage.getItem('email')
                );
                setDangKyThucTaps(filteredDangKy);
            } catch (error) {
                alert('Lỗi khi tải dữ liệu: ' + (error.response?.data || error.message));
            }
        };
        fetchData();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createDangKyThucTap({ email, dnId });
            alert('Đăng ký thực tập thành công!');
            const dangKyData = await getDangKyThucTaps();
            const filteredDangKy = dangKyData.filter(
                (dk) => dk.sinhVien?.email === localStorage.getItem('email')
            );
            setDangKyThucTaps(filteredDangKy);
        } catch (error) {
            alert('Đăng ký thất bại: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="page">
            <Header />
            <div className="student-container">
                <div className="register-form">
                    <h3>Đăng ký thực tập</h3>
                    <form onSubmit={handleRegister}>
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
                            <label>Chọn Doanh Nghiệp</label>
                            <select value={dnId} onChange={(e) => setDnId(e.target.value)} required>
                                <option value="">Chọn doanh nghiệp</option>
                                {doanhNghieps.map((dn) => (
                                    <option key={dn.dnId} value={dn.dnId}>
                                        {dn.tenDN}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Đăng ký</button>
                    </form>
                </div>
                <div className="history">
                    <h3>Lịch sử đăng ký</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Doanh Nghiệp</th>
                                <th>Ngày Đăng ký</th>
                                <th>Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dangKyThucTaps.map((dk) => (
                                <tr key={dk.dkttId}>
                                    <td>{dk.doanhNghiep?.tenDN}</td>
                                    <td>{new Date(dk.ngayDangKy).toLocaleDateString()}</td>
                                    <td>{dk.trangThai}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentPage;