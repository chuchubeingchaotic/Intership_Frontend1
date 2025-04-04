import axios from 'axios';

const API_URL = 'https://localhost:7162/api'; // Thay bằng URL backend của bạn

const api = axios.create({
    baseURL: API_URL,
});

// Thêm token vào header cho các yêu cầu cần xác thực
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email, matKhau, role) => {
    const response = await api.post('/Auth/Login', { email, matKhau, role });
    return response.data;
};

export const registerSinhVien = async (sinhVien) => {
    const response = await api.post('/SinhVien', sinhVien);
    return response.data;
};

export const registerDoanhNghiep = async (doanhNghiep) => {
    const response = await api.post('/DoanhNghiep', doanhNghiep);
    return response.data;
};

export const getSinhViens = async () => {
    const response = await api.get('/SinhVien');
    return response.data;
};

export const deleteSinhVien = async (id) => {
    await api.delete(`/SinhVien/${id}`);
};

export const getDoanhNghieps = async () => {
    const response = await api.get('/DoanhNghiep');
    return response.data;
};

export const getDoanhNghiepsForDangKy = async () => {
    const response = await api.get('/DangKyThucTap/doanh-nghieps');
    return response.data;
};

export const deleteDoanhNghiep = async (id) => {
    await api.delete(`/DoanhNghiep/${id}`);
};

export const getDangKyThucTaps = async () => {
    const response = await api.get('/DangKyThucTap');
    return response.data;
};

export const createDangKyThucTap = async (dangKyThucTap) => {
    const response = await api.post('/DangKyThucTap', dangKyThucTap);
    return response.data;
};

export const updateDangKyThucTap = async (id, trangThai) => {
    await api.put(`/DangKyThucTap/${id}`, { trangThai });
};

export const deleteDangKyThucTap = async (id) => {
    await api.delete(`/DangKyThucTap/${id}`);
};