import React, { useState, useEffect } from "react";
import progressService from "../../../services/progressService";
import "../../../assets/styles/ProgressPage.css";

function StudentProgress() {
    const [progressList, setProgressList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    // Thêm state lưu Topic ID của sinh viên (mặc định lấy từ localStorage hoặc API đề tài)
    const [topicId, setTopicId] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user.topic_id || user.topicId || 1; // Mặc định ID 1 nếu chưa gán
    });

    const [formData, setFormData] = useState({
        week: "",
        percentage: 0,
        description: ""
    });

    useEffect(() => {
        fetchProgress();
    }, [topicId]);

    const fetchProgress = async () => {
        try {
            const res = await progressService.getStudentProgress(topicId);

            console.log("FETCH PROGRESS:", res);

            const data = res.data?.data || res.data || res;
            console.log("DATA:", data);

            setProgressList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi khi tải tiến độ:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!topicId) {
            alert("Không tìm thấy thông tin đề tài của bạn!");
            return;
        }

        const payload = {
            topic_id: Number(topicId),
            topicId: Number(topicId),
            week: formData.week,
            title: formData.week,
            percentage: Number(formData.percentage),
            progress_percent: Number(formData.percentage),
            description: formData.description,
            content: formData.description
        };

        try {
            console.log("PAYLOAD GỬI LÊN:", payload);
            await progressService.createProgress(payload);

            alert("Cập nhật tiến độ thành công!");

            setShowModal(false);

            setFormData({
                week: "",
                percentage: 0,
                description: ""
            });

            await fetchProgress();

        } catch (error) {
            console.error("Lỗi Server:", error.response?.data);
            alert(
                error.response?.data?.message ||
                "Lỗi cập nhật tiến độ!"
            );
        }
    };

    return (
        <div className="progress-container">
            {/* Header: Tiến độ đề tài */}
            <div className="header-section">
                <h2>Tiến độ đề tài</h2>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    + Cập nhật tiến độ
                </button>
            </div>

            <hr className="divider" />

            {/* Lịch sử tiến độ */}
            <div className="history-section">
                <h3>Lịch sử tiến độ</h3>

                <div className="history-list">
                    {progressList.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#777", marginTop: "20px" }}>
                            Chưa có báo cáo tiến độ nào được nộp.
                        </p>
                    ) : (
                        progressList.map((item, index) => (
                            <div key={item.id || index} className="history-card">
                                <div className="card-header">
                                    <span className="week-title">{item.week || `Tuần ${index + 1}`}</span>
                                    <span className="status-badge submitted">Đã nộp</span>
                                </div>
                                <div className="card-body">
                                    <p className="description">{item.description}</p>
                                    <p className="percent-text">
                                        <strong>Tiến độ:</strong> {item.percentage ?? item.progress_percent ?? item.percent ?? item.progress ?? 0}%
                                    </p>
                                                                    </div>
                                <div className="card-footer">
                                    <strong>GV:</strong> {item.lecturer_comment || "Chưa có nhận xét"}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal Cập nhật tiến độ */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Cập nhật tiến độ</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Tên tuần / Giai đoạn:</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: Tuần 1"
                                    value={formData.week}
                                    onChange={(e) => setFormData({ ...formData, week: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Tiến độ (%):</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.percentage}
                                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nội dung công việc đã làm:</label>
                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                                <button type="submit" className="btn-primary">Lưu cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentProgress;