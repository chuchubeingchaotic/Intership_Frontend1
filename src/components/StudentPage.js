import React, { useState, useEffect } from 'react';
import { getDoanhNghiepsForDangKy, getDangKyThucTaps, createDangKyThucTap } from '../services/api';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const StudentPage = () => {
    const [activeTab, setActiveTab] = useState('dangKyThucTap');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [dnId, setDnId] = useState('');
    const [vtId, setVtId] = useState(''); // Thêm state cho vtId
    const [doanhNghieps, setDoanhNghieps] = useState([]);
    const [dangKyThucTaps, setDangKyThucTaps] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null); // State để theo dõi hàng được mở rộng

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doanhNghiepData = await getDoanhNghiepsForDangKy();
                setDoanhNghieps(doanhNghiepData);

                const dangKyData = await getDangKyThucTaps();
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
            await createDangKyThucTap({ email, dnId, vtId }); 
            alert('Đăng ký thực tập thành công!');
            const dangKyData = await getDangKyThucTaps();
            const filteredDangKy = dangKyData.filter(
                (dk) => dk.sinhVien?.email === localStorage.getItem('email')
            );
            setDangKyThucTaps(filteredDangKy);
        } catch (error) {
            alert('Đăng ký thất bại: ' + JSON.stringify(error.response?.data || error.message));
        }
    };

    const toggleRow = (dnId) => {
        setExpandedRow(expandedRow === dnId ? null : dnId);
    };

    return (
        <div className="page">
            <Header />
            <div className="student-container">
                <div className="tab-container">
                    <div className="tab-header">
                        <button
                            className={activeTab === 'dangKyThucTap' ? 'active' : ''}
                            onClick={() => setActiveTab('dangKyThucTap')}
                        >
                            Đăng ký thực tập
                        </button>
                        <button
                            className={activeTab === 'lichSuDangKy' ? 'active' : ''}
                            onClick={() => setActiveTab('lichSuDangKy')}
                        >
                            Lịch sử đăng ký
                        </button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'dangKyThucTap' && (
                            <div className="student-section">
                                <div className="register-form">
                                    <h3>Đăng ký thực tập</h3>
                                    <form onSubmit={handleRegister}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                // onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Chọn Doanh Nghiệp</label>
                                            <select
                                                value={dnId}
                                                onChange={(e) => {
                                                    setDnId(e.target.value);
                                                    setVtId(''); // Reset vtId khi thay đổi doanh nghiệp
                                                }}
                                                required
                                            >
                                                <option value="">Chọn doanh nghiệp</option>
                                                {doanhNghieps.map((dn) => (
                                                    <option key={dn.dnId} value={dn.dnId}>
                                                        {dn.tenDN}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {dnId && (
                                            <div className="form-group">
                                                <label>Chọn Vị trí Thực tập</label>
                                                <select
                                                    value={vtId}
                                                    onChange={(e) => setVtId(e.target.value)}
                                                >
                                                    <option value="">Không chọn vị trí cụ thể</option>
                                                    {doanhNghieps
                                                        .find((dn) => dn.dnId === dnId)
                                                        ?.viTriThucTaps
                                                        ?.filter((vt) => vt.soLuong > 0) 
                                                        .map((vt) => (
                                                            <option key={vt.vtId} value={vt.vtId}>
                                                                {vt.tenViTri} (Số lượng: {vt.soLuong})
                                                            </option>
                                                    ))}

                                                </select>
                                            </div>
                                        )}
                                        <button type="submit">Đăng ký</button>
                                    </form>
                                </div>

                                <div className="doanh-nghiep-list">
                                    <h3>Danh sách doanh nghiệp</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tên doanh nghiệp</th>
                                                <th>Địa chỉ</th>
                                                <th>Số điện thoại</th>
                                                <th>Email</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doanhNghieps.map((dn) => (
                                                <React.Fragment key={dn.dnId}>
                                                    <tr>
                                                        <td>{dn.tenDN}</td>
                                                        <td>{dn.diaChi}</td>
                                                        <td>{dn.soDT}</td>
                                                        <td>{dn.email}</td>
                                                        <td>
                                                            {dn.viTriThucTaps?.length > 0 && (
                                                                <button onClick={() => toggleRow(dn.dnId)}>
                                                                    {expandedRow === dn.dnId ? 'Ẩn' : 'Xem vị trí thực tập'}
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    {expandedRow === dn.dnId && dn.viTriThucTaps?.length > 0 && (
                                                        <tr>
                                                            <td colSpan="5">
                                                                <div className="vi-tri-list">
                                                                    <h4>Danh sách vị trí thực tập</h4>
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Tên vị trí</th>
                                                                                <th>Mô tả</th>
                                                                                <th>Số lượng tuyển</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {dn.viTriThucTaps.map((vt) => (
                                                                                <tr key={vt.vtId}>
                                                                                    <td>{vt.tenViTri}</td>
                                                                                    <td>{vt.moTa || 'Không có'}</td>
                                                                                    <td>{vt.soLuong}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'lichSuDangKy' && (
                            <div className="student-section">
                                <div className="history">
                                    <h3>Lịch sử đăng ký</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Doanh nghiệp</th>
                                                <th>Vị trí thực tập</th>
                                                <th>Ngày đăng ký</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dangKyThucTaps.map((dk) => (
                                                <tr key={dk.dkttId}>
                                                    <td>{dk.doanhNghiep?.tenDN}</td>
                                                    <td>{dk.viTriThucTap?.tenViTri || 'Không chọn'}</td>
                                                    <td>{new Date(dk.ngayDangKy).toLocaleDateString()}</td>
                                                    <td>{dk.trangThai}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentPage;