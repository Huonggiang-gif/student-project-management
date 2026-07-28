import api from "./api";

// Lấy tất cả đề tài
export async function getProjects() {
    const response = await api.get("/projects");
    return response.data;
}

// Lấy chi tiết đề tài
export async function getProject(id) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
}

// Tạo đề tài
export async function createProject(data) {
    const response = await api.post("/projects", data);
    return response.data;
}

// Cập nhật đề tài
export async function updateProject(id, data) {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
}

// Xóa đề tài
export async function deleteProject(id) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
}