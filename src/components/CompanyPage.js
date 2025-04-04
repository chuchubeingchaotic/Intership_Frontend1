import React, { useState, useEffect } from 'react';
import { getDangKyThucTaps, updateDangKyThucTap } from '../services/api';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const CompanyPage = () => {
    const [dangKyThucTaps, setDangKyThucTaps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDangKyThucTaps();
                // Lọc các đăng ký của doanh nghiệp hiện tại
                const filteredDangKy = data.filter(
                    (dk) => dk.doanhNghiep?.email === localStorage.getItem('email')
                );
                setDangKyThucTaps(filteredDangKy);
            } catch (error) {
                alert('Lỗi khi tải dữ liệu: ' + (error.response?.data || error.message));
            }
        };
        fetchData();
    }, []);

    const handleApprove = async (id) => {
        try {
            await updateDangKyThucTap(id, 'Đã duyệt');
            alert('Đã duyệt yêu cầu!');
            const data = await getDangKyThucTaps();
            const filteredDangKy = data.filter(
                (dk) => dk.doanhNghiep?.email === localStorage.getItem('email')
            );
            setDangKyThucTaps(filteredDangKy);
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data || error.message));
        }
    };

    const handleReject = async (id) => {
        try {
            await updateDangKyThucTap(id, 'Từ chối');
            alert('Đã từ chối yêu cầu!');
            const data = await getDangKyThucTaps();
            const filteredDangKy = data.filter(
                (dk) => dk.doanhNghiep?.email === localStorage.getItem('email')
            );
            setDangKyThucTaps(filteredDangKy);
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="page">
            <Header />
            <div className="company-container">
                <h3>Danh sách Sinh viên Đăng ký</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Sinh Viên</th>
                            <th>Mã Sinh viên</th>
                            <th>Lớp</th>
                            <th>Số điện thoại</th>
                            <th>GPA</th>
                            <th>Email</th>
                            <th>Ngày Đăng ký</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dangKyThucTaps.map((dk) => (
                            <tr key={dk.dkttId}>
                                <td>{dk.sinhVien?.hoTen}</td>
                                <td>{dk.sinhVien?.maSV}</td>
                                <td>{dk.sinhVien?.lop}</td>
                                <td>{dk.sinhVien?.sdt}</td>
                                <td>{dk.sinhVien?.gpa}</td>
                                <td>{dk.sinhVien?.email}</td>
                                <td>{new Date(dk.ngayDangKy).toLocaleDateString()}</td>
                                <td>{dk.trangThai}</td>
                                <td>
                                    <button onClick={() => handleApprove(dk.dkttId)}>Duyệt</button>
                                    <button onClick={() => handleReject(dk.dkttId)}>Từ chối</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default CompanyPage;