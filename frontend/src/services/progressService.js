import api from "./api";

// Lấy danh sách tiến độ theo Topic
export async function getProgress(topicId) {
    const response = await api.get(`/progress/${topicId}`);
    return response.data;
}

// Lấy chi tiết tiến độ
export async function getProgressById(id) {
    const response = await api.get(`/progress/detail/${id}`);
    return response.data;
}

// Thêm tiến độ mới
export async function createProgress(topicId, description) {
    const response = await api.post("/progress", {
        topic_id: topicId,
        description
    });

    return response.data;
}

// Giảng viên nhận xét
export async function updateComment(id, lecturerComment) {
    const response = await api.put(
        `/progress/${id}/comment`,
        {
            lecturer_comment: lecturerComment
        }
    );

    return response.data;
}

// Xóa tiến độ
export async function deleteProgress(id) {
    const response = await api.delete(`/progress/${id}`);
    return response.data;
}

const progressService = {
    getAll() {
        return api.get("/progress");
    },

    getById(id) {
        return api.get(`/progress/${id}`);
    },

    create(data) {
        return api.post("/progress", data);
    },

    update(id, data) {
        return api.put(`/progress/${id}`, data);
    },

    remove(id) {
        return api.delete(`/progress/${id}`);
    }
};

export default progressService;
