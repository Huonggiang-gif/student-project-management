import api from "./api";
// Tạo đánh giá
export async function createEvaluation(data){

    const response = await api.post(
        "/evaluations",
        data
    );

    return response.data;
}

// Lấy đánh giá theo đề tài
export async function getEvaluation(topic_id){

    const response = await api.get(
        `/evaluations/topic/${topic_id}`
    );

    return response.data;
}

// Cập nhật đánh giá
export async function updateEvaluation(id, data){

    const response = await api.put(
        `/evaluations/${id}`,
        data
    );

    return response.data;
}
//Xóa đánh giá
export async function deleteEvaluation(id){

    const response = await api.delete(
        `/evaluations/${id}`
    );

    return response.data;
}