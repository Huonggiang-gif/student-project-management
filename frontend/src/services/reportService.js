import api from "./api";

// Lấy danh sách báo cáo
export async function getReports(projectId) {
    const response = await api.get(`/reports/${projectId}`);
    return response.data;
}

// Chi tiết báo cáo
export async function getReport(id) {
    const response = await api.get(`/reports/detail/${id}`);
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