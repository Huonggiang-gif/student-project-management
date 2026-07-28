function ViewReport({ report, onClose }) {

    return (

        <div className="admin-modal-overlay">

            <div className="admin-modal-content">

                <h2>Chi tiết báo cáo</h2>

                <div className="detail-section">

                    <p><strong>Sinh viên:</strong> {report.student_name}</p>

                    <p><strong>Mã sinh viên:</strong> {report.user_code}</p>

                    <p><strong>Đề tài:</strong> {report.topic_title}</p>

                    <p><strong>Giảng viên:</strong> {report.lecturer_name || "Chưa phân công"}</p>

                    <p>
                        <strong>Ngày nộp:</strong>{" "}
                        {new Date(report.submitted_at).toLocaleDateString("vi-VN")}
                    </p>

                    <p>
                        <strong>Trạng thái:</strong>{" "}
                        {report.status === "submitted"
                            ? "Đã nộp"
                            : report.status === "reviewed"
                            ? "Đã đánh giá"
                            : "Cần chỉnh sửa"}
                    </p>
                </div>

                <hr />

                <div className="detail-section">
                    <h3>Đánh giá</h3>
                    <p>Điểm báo cáo: {report.report_score ?? "Chưa có"}</p>
                    <p>Điểm demo: {report.demo_score ?? "Chưa có"}</p>
                    <p>Điểm thuyết trình: {report.presentation_score ?? "Chưa có"}</p>
                    <p>Điểm bảo vệ: {report.defense_score ?? "Chưa có"}</p>
                    <p>Tổng điểm: {report.total_score ?? "Chưa có"}</p>
                    <p>Nhận xét: {report.comment || "Chưa có nhận xét"}</p>
                </div>
                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Đóng
                </button>

            </div>

        </div>

    );

}

export default ViewReport;