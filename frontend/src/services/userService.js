import api from "./api";

// Lấy tất cả người dùng
export async function getUsers() {
    const response = await api.get("/users");

    return response.data;
}

// Tìm kiếm người dùng
export async function searchUsers(keyword) {
    const response = await api.get(`/users/search?keyword=${keyword}`);

    return response.data;
}

// Lấy danh sách sinh viên
export async function getStudents() {
    const response = await api.get("/users/students");

    return response.data;
}

// Lấy danh sách giảng viên
export async function getLecturers() {
    const response = await api.get("/users/lecturers");

    return response.data;
}
//Thêm người dùng
export async function createUser(userData){

    const response = await api.post("/users", userData);

    return response.data;
}
// Cập nhật thông tin
export async function updateUser(id, data) {
    const response = await api.put(`/users/${id}`, data);

    return response.data;
}

// Khóa/Mở khóa tài khoản
export async function updateUserStatus(id, status) {
    const response = await api.patch(`/users/${id}/status`, {
        status
    });

    return response.data;
}