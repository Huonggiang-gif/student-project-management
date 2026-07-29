import axios from "axios";

// Đổi port 5000 thành đúng Port Backend của bạn (VD: 3000, 8080)
const API_URL = "http://localhost:3000/api/progress"; 

const progressService = {
    // 1. Sinh viên lấy lịch sử tiến độ
    getStudentProgress: (topicId) => {
        return axios.get(`${API_URL}/${topicId}`);
    },
    // Giảng viên xem tiến độ theo đề tài
    getProgress: async (topicId) => {
        const res = await axios.get(`${API_URL}/${topicId}`);
        return res.data;
    },
    // 2. Sinh viên cập nhật tiến độ
    createProgress: (data) => {
        return axios.post(API_URL, data);
    },

    // 3. Giảng viên cập nhật nhận xét
    updateComment: (id, data) => {
        return axios.put(`${API_URL}/${id}/comment`, data);
    },

    // 4. Giảng viên lấy danh sách sinh viên
    getLecturerStudentsProgress: () => {
        return axios.get(`${API_URL}/lecturer/students`);
    },

    // 5. Admin lấy tất cả tiến độ
    getAllProgress: async () => {
    const res = await axios.get(API_URL);
    return res.data;
    },

    // 6. Admin xóa tiến độ
    deleteProgress: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }
};

export default progressService;