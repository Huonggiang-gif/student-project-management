import api from "./api";
// Lấy báo cáo của sinh viên thuộc giảng viên
export async function getLecturerReports() {
    const response = await api.get("/reports/lecturer");
    return response.data;
}
// Lấy danh sách báo cáo
export async function getReports(topicId) {
    const response = await api.get(`/reports/topic/${topicId}`);
    return response.data;
}

// Chi tiết báo cáo
export async function getReport(id) {
    const response = await api.get(`/reports/detail/${id}`);
    return response.data;
}
// Lấy tất cả danh sách báo cáo
export async function getAllReports() {
    const response = await api.get(
        "/reports/admin"
    );
    return response.data;
}
// Upload báo cáo
export async function uploadReport(topicId, file) {
    const formData = new FormData();
    formData.append("topic_id", topicId);
    formData.append("report_file", file);
    const response = await api.post(
        "/reports",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data;
}

// Xóa
export async function deleteReport(id) {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
}

// Cập nhật trạng thái
export async function updateStatus(id, status) {
    const response = await api.put(
        `/reports/${id}/status`,
        {
            status
        }
    );
    return response.data;
}