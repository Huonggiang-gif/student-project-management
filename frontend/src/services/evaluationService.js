import api from "./api";

// Lấy danh sách đánh giá theo đề tài
export async function getEvaluations(topicId) {
    const response = await api.get(`/evaluations/${topicId}`);
    return response.data;
}

// Lấy chi tiết đánh giá
export async function getEvaluation(id) {
    const response = await api.get(`/evaluations/detail/${id}`);
    return response.data;
}

// Thêm đánh giá
export async function createEvaluation(data) {
    const response = await api.post(
        "/evaluations",
        data
    );
    return response.data;
}

// Cập nhật đánh giá
export async function updateEvaluation(id, data) {
    const response = await api.put(
        `/evaluations/${id}`,
        data
    );
    return response.data;
}

// Xóa đánh giá
export async function deleteEvaluation(id) {
    const response = await api.delete(
        `/evaluations/${id}`
    );
    return response.data;
}