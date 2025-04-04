export const users = [
    {
        email: "sinhvien1@example.com",
        matKhau: "password123",
        role: "SinhVien",
        hoTen: "Nguyễn Văn A",
        maSV: "SV001",
        lop: "22IT3",
        sdt: "0123456789",
        gpa: 3.5,
    },
    {
        email: "doanhnghiep1@example.com",
        matKhau: "password123",
        role: "DoanhNghiep",
        tenDN: "Công ty ABC",
        diaChi: "123 Đường Láng, Hà Nội",
        sdt: "0987654321",
    },
    {
        email: "admin@example.com",
        matKhau: "admin123",
        role: "Admin",
    },
];

export const dangKyThucTaps = [
    {
        dkttId: "1",
        svId: "SV001",
        dnId: "Công ty ABC",
        ngayDangKy: "2025-03-24",
        trangThai: "Chờ duyệt",
        sinhVien: {
            hoTen: "Nguyễn Văn A",
            maSV: "SV001",
            lop: "22IT3",
            sdt: "0123456789",
            gpa: 3.5,
            email: "sinhvien1@example.com",
        },
        doanhNghiep: { tenDN: "Công ty ABC" },
    },
    {
        dkttId: "2",
        svId: "SV001",
        dnId: "Công ty XYZ",
        ngayDangKy: "2025-03-23",
        trangThai: "Đã duyệt",
        sinhVien: {
            hoTen: "Nguyễn Văn A",
            maSV: "SV001",
            lop: "22IT3",
            sdt: "0123456789",
            gpa: 3.5,
            email: "sinhvien1@example.com",
        },
        doanhNghiep: { tenDN: "Công ty XYZ" },
    },
];

export const doanhNghieps = [
    { dnId: "1", tenDN: "Công ty ABC" },
    { dnId: "2", tenDN: "Công ty XYZ" },
];