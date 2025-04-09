import React, { useState, useEffect } from 'react';
import { getSinhViens, deleteSinhVien, getDoanhNghieps, deleteDoanhNghiep, getDangKyThucTaps, deleteDangKyThucTap } from '../services/api';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('sinhVien');
    const [sinhViens, setSinhViens] = useState([]);
    const [doanhNghieps, setDoanhNghieps] = useState([]);
    const [dangKyThucTaps, setDangKyThucTaps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sinhVienData = await getSinhViens();
                setSinhViens(sinhVienData);

                const doanhNghiepData = await getDoanhNghieps();
                setDoanhNghieps(doanhNghiepData);

                const dangKyData = await getDangKyThucTaps();
                setDangKyThucTaps(dangKyData);
            } catch (error) {
                alert('Lỗi khi tải dữ liệu: ' + (error.response?.data || error.message));
            }
        };
        fetchData();
    }, []);

    const handleDeleteSinhVien = async (id) => {
        try {
            await deleteSinhVien(id);
            alert('Đã xóa sinh viên!');
            const data = await getSinhViens();
            setSinhViens(data);
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data || error.message));
        }
    };

    const handleDeleteDoanhNghiep = async (id) => {
        try {
            await deleteDoanhNghiep(id);
            alert('Đã xóa doanh nghiệp!');
            const data = await getDoanhNghieps();
            setDoanhNghieps(data);
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data || error.message));
        }
    };

    const handleDeleteDangKy = async (id) => {
        try {
            await deleteDangKyThucTap(id);
            alert('Đã xóa yêu cầu đăng ký!');
            const data = await getDangKyThucTaps();
            setDangKyThucTaps(data);
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="page">
            <Header />
            <div className="admin-container">
                <div className="tab-container">
                    <div className="tab-header">
                        <button
                            className={activeTab === 'sinhVien' ? 'active' : ''}
                            onClick={() => setActiveTab('sinhVien')}
                        >
                            Quản lý sinh viên
                        </button>
                        <button
                            className={activeTab === 'doanhNghiep' ? 'active' : ''}
                            onClick={() => setActiveTab('doanhNghiep')}
                        >
                            Quản lý doanh nghiệp
                        </button>
                        <button
                            className={activeTab === 'dangKy' ? 'active' : ''}
                            onClick={() => setActiveTab('dangKy')}
                        >
                            Quản lý đăng ký thực tập
                        </button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'sinhVien' && (
                            <div className="admin-section">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Họ tên</th>
                                            <th>Mã SV</th>
                                            <th>Email</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sinhViens.map((sv) => (
                                            <tr key={sv.svId}>
                                                <td>{sv.hoTen}</td>
                                                <td>{sv.maSV}</td>
                                                <td>{sv.email}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteSinhVien(sv.svId)}>Xóa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'doanhNghiep' && (
                            <div className="admin-section">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tên doanh nghiệp</th>
                                            <th>Email</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doanhNghieps.map((dn) => (
                                            <tr key={dn.dnId}>
                                                <td>{dn.tenDN}</td>
                                                <td>{dn.email}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteDoanhNghiep(dn.dnId)}>Xóa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'dangKy' && (
                            <div className="admin-section">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sinh viên</th>
                                            <th>Doanh nghiệp</th>
                                            <th>Vị trí thực tập</th> {/* Thêm cột Vị trí Thực tập */}
                                            <th>Ngày đăng ký</th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dangKyThucTaps.map((dk) => (
                                            <tr key={dk.dkttId}>
                                                <td>{dk.sinhVien?.hoTen}</td>
                                                <td>{dk.doanhNghiep?.tenDN}</td>
                                                <td>{dk.viTriThucTap?.tenViTri || 'Không chọn'}</td> {/* Hiển thị tên vị trí */}
                                                <td>{new Date(dk.ngayDangKy).toLocaleDateString()}</td>
                                                <td>{dk.trangThai}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteDangKy(dk.dkttId)}>Xóa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPage;