import axios from 'axios';

const BASE_URL = 'https://localhost:7162';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (loginData) => {
    const response = await axios.post(`${BASE_URL}/api/Auth/Login`, loginData);
    return response.data;
};

export const getSinhViens = async () => {
    const response = await axios.get(`${BASE_URL}/api/SinhVien`, { headers: getAuthHeader() });
    return response.data;
};

export const deleteSinhVien = async (id) => {
    await axios.delete(`${BASE_URL}/api/SinhVien/${id}`, { headers: getAuthHeader() });
};

export const getDoanhNghieps = async () => {
    const response = await axios.get(`${BASE_URL}/api/DoanhNghiep`, { headers: getAuthHeader() });
    return response.data;
};

export const getDoanhNghiepsForDangKy = async () => {
    const response = await axios.get(`${BASE_URL}/api/DangKyThucTap/doanh-nghieps`);
    return response.data;
};

export const deleteDoanhNghiep = async (id) => {
    await axios.delete(`${BASE_URL}/api/DoanhNghiep/${id}`, { headers: getAuthHeader() });
};

export const getDangKyThucTaps = async () => {
    const response = await axios.get(`${BASE_URL}/api/DangKyThucTap`, { headers: getAuthHeader() });
    return response.data;
};

export const createDangKyThucTap = async (dangKyData) => {
    await axios.post(`${BASE_URL}/api/DangKyThucTap`, dangKyData, { headers: getAuthHeader() });
};

export const deleteDangKyThucTap = async (id) => {
    await axios.delete(`${BASE_URL}/api/DangKyThucTap/${id}`, { headers: getAuthHeader() });
};

export const createSinhVien = async (sinhVienData) => {
    await axios.post(`${BASE_URL}/api/SinhVien`, sinhVienData);
};

export const createDoanhNghiep = async (doanhNghiepData) => {
    await axios.post(`${BASE_URL}/api/DoanhNghiep`, doanhNghiepData);
};

export const getViTriThucTaps = async () => {
    const response = await axios.get(`${BASE_URL}/api/ViTriThucTap`, { headers: getAuthHeader() });
    return response.data;
};

export const createViTriThucTap = async (viTriData) => {
    await axios.post(`${BASE_URL}/api/ViTriThucTap`, viTriData, { headers: getAuthHeader() });
};

export const updateViTriThucTap = async (id, viTriData) => {
    await axios.put(`${BASE_URL}/api/ViTriThucTap/${id}`, viTriData, { headers: getAuthHeader() });
};

export const deleteViTriThucTap = async (id) => {
    await axios.delete(`${BASE_URL}/api/ViTriThucTap/${id}`, { headers: getAuthHeader() });
};

export const updateTrangThaiDangKy = async (dkttId, trangThai) => {
    await axios.put(
        `${BASE_URL}/api/DangKyThucTap/${dkttId}/status`,
        { trangThai },
        { headers: getAuthHeader() }
    );
};
