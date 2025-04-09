import React, { useState, useEffect } from 'react';
import { getDangKyThucTaps, getViTriThucTaps, createViTriThucTap, deleteViTriThucTap } from '../services/api';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { updateTrangThaiDangKy } from '../services/api';

const CompanyPage = () => {
    const [activeTab, setActiveTab] = useState('danhSachSinhVien');
    const [dangKyThucTaps, setDangKyThucTaps] = useState([]);
    const [viTriThucTaps, setViTriThucTaps] = useState([]);
    const [tenViTri, setTenViTri] = useState('');
    const [moTa, setMoTa] = useState('');
    const [soLuongTuyen, setSoLuongTuyen] = useState('');
    const [yeuCau, setYeuCau] = useState('');
    const [loading, setLoading] = useState(false); // Thêm state loading

    // Hàm lấy danh sách vị trí thực tập
    const fetchViTriThucTaps = async () => {
        try {
            setLoading(true);
            const data = await getViTriThucTaps();
            setViTriThucTaps(data);
        } catch (error) {
            alert('Lỗi khi tải danh sách vị trí thực tập: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const dangKyData = await getDangKyThucTaps();
                const filteredDangKy = dangKyData.filter(
                    (dk) => dk.doanhNghiep?.email === localStorage.getItem('email')
                );
                setDangKyThucTaps(filteredDangKy);

                await fetchViTriThucTaps(); // Gọi hàm lấy danh sách vị trí thực tập
            } catch (error) {
                alert('Lỗi khi tải dữ liệu: ' + (error.response?.data || error.message));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddViTri = async (e) => {
        e.preventDefault();
        if (parseInt(soLuongTuyen) <= 0) {
            alert('Số lượng tuyển phải lớn hơn 0');
            return;
        }
        try {
            setLoading(true);
            await createViTriThucTap({
                tenViTri,
                moTa,
                soLuong: parseInt(soLuongTuyen),
                yeuCau,
            });
            alert('Thêm vị trí thực tập thành công!');
            
            // Làm mới danh sách vị trí thực tập sau khi thêm
            await fetchViTriThucTaps();

            // Reset form
            setTenViTri('');
            setMoTa('');
            setSoLuongTuyen('');
            setYeuCau('');
        } catch (error) {
            alert('Thêm vị trí thất bại: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteViTri = async (vtId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa vị trí này không?')) return;
    
        try {
            setLoading(true);
            await deleteViTriThucTap(vtId);
            alert('Xóa vị trí thành công!');
            await fetchViTriThucTaps(); // Refresh lại danh sách
        } catch (error) {
            alert('Xóa vị trí thất bại: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateTrangThai = async (id, trangThai) => {
        try {
            setLoading(true);
    
            const dangKy = dangKyThucTaps.find((dk) => dk.dkttId === id);
            const viTri = viTriThucTaps.find((vt) => vt.vtId === dangKy.viTriThucTap?.vtId);
    
            if (trangThai === 'Đã duyệt') {
                if (!viTri || viTri.soLuong <= 0) {
                    alert('Vị trí này đã đủ số lượng. Không thể duyệt thêm sinh viên.');
                    return;
                }
            }
    
            await updateTrangThaiDangKy(id, trangThai);
    
            // Sau khi duyệt, giảm số lượng trong danh sách local (nếu cần)
            if (trangThai === 'Đã duyệt') {
                setViTriThucTaps((prev) =>
                    prev.map((vt) =>
                        vt.vtId === viTri.vtId ? { ...vt, soLuong: vt.soLuong - 1 } : vt
                    )
                );
            }
    
            // Làm mới danh sách đăng ký
            const updated = await getDangKyThucTaps();
            const filtered = updated.filter(dk => dk.doanhNghiep?.email === localStorage.getItem('email'));
            setDangKyThucTaps(filtered);
        } catch (error) {
            alert('Cập nhật trạng thái thất bại: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="page">
            <Header />
            <div className="company-container">
                <div className="tab-container">
                    <div className="tab-header">
                        <button
                            className={activeTab === 'danhSachSinhVien' ? 'active' : ''}
                            onClick={() => setActiveTab('danhSachSinhVien')}
                        >
                            Danh sách sinh viên đăng ký
                        </button>
                        <button
                            className={activeTab === 'viTriThucTap' ? 'active' : ''}
                            onClick={() => setActiveTab('viTriThucTap')}
                        >
                            Quản lý vị trí thực tập
                        </button>
                    </div>
                    <div className="tab-content">
                    {activeTab === 'danhSachSinhVien' && (
                            <div className="company-section">
                                <h3>Danh sách Sinh viên Đăng ký</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Họ Tên</th>
                                            <th>Mã Sinh Viên</th>
                                            <th>Lớp</th>
                                            <th>Email</th>
                                            <th>Số Điện Thoại</th>
                                            <th>GPA</th>
                                            <th>Vị trí Thực tập</th>
                                            <th>Ngày Đăng ký</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dangKyThucTaps.map((dk) => (
                                            <tr key={dk.dkttId}>
                                                <td>{dk.sinhVien?.hoTen}</td>
                                                <td>{dk.sinhVien?.maSV}</td>
                                                <td>{dk.sinhVien?.lop}</td>
                                                <td>{dk.sinhVien?.email}</td>
                                                <td>{dk.sinhVien?.sdt}</td>
                                                <td>{dk.sinhVien?.gpa}</td>
                                                <td>{dk.viTriThucTap?.tenViTri || 'Không chọn'}</td> {/* Hiển thị tên vị trí */}
                                                <td>{new Date(dk.ngayDangKy).toLocaleDateString()}</td>
                                                <td>
                                                {dk.trangThai === 'Đã duyệt' || dk.trangThai === 'Từ chối' ? (
                                                    dk.trangThai
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateTrangThai(dk.dkttId, 'Đã duyệt')}
                                                            disabled={
                                                                viTriThucTaps.find((vt) => vt.vtId === dk.viTriThucTap?.vtId)?.soLuong <= 0
                                                            }
                                                        >
                                                            Duyệt
                                                        </button>
                                                        <button onClick={() => handleUpdateTrangThai(dk.dkttId, 'Từ chối')}>
                                                            Từ chối
                                                        </button>
                                                        {/* Hiển thị cảnh báo nếu hết số lượng */}
                                                        {viTriThucTaps.find((vt) => vt.vtId === dk.viTriThucTap?.vtId)?.soLuong <= 0 && (
                                                            <span style={{ color: 'red', marginLeft: '8px', fontSize: '0.9em' }}>
                                                                Đã đủ số lượng!
                                                            </span>
                                                        )}
                                                    </>
                                                )}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'viTriThucTap' && (
                            <div className="company-section">
                                <div className="vi-tri-form">
                                    <h3>Thêm Vị trí Thực tập</h3>
                                    <form onSubmit={handleAddViTri}>
                                        <div className="form-group">
                                            <label>Tên Vị trí</label>
                                            <input
                                                type="text"
                                                value={tenViTri}
                                                onChange={(e) => setTenViTri(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mô tả</label>
                                            <textarea
                                                value={moTa}
                                                onChange={(e) => setMoTa(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Số lượng tuyển</label>
                                            <input
                                                type="number"
                                                value={soLuongTuyen}
                                                onChange={(e) => setSoLuongTuyen(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Yêu cầu</label>
                                            <textarea
                                                value={yeuCau}
                                                onChange={(e) => setYeuCau(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Đang thêm...' : 'Thêm vị trí'}
                                        </button>
                                    </form>
                                </div>
                                <div className="vi-tri-list">
                                    <h3>Danh sách Vị trí Thực tập</h3>
                                    {loading ? (
                                        <p>Đang tải danh sách...</p>
                                    ) : viTriThucTaps.length === 0 ? (
                                        <p>Chưa có vị trí thực tập nào.</p>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Tên Vị trí</th>
                                                    <th>Mô tả</th>
                                                    <th>Số lượng tuyển</th>
                                                    <th>Yêu cầu</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {viTriThucTaps.map((vt) => (
                                                    <tr key={vt.vtId}>
                                                        <td>{vt.tenViTri}</td>
                                                        <td>{vt.moTa}</td>
                                                        <td>{vt.soLuong}</td>
                                                        <td>{vt.yeuCau}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
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

export default CompanyPage;