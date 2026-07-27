import "./TaskPage.css";
import { FaPaperPlane, FaRegSave, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

function TaskPage() {

    return (

        <div className="task-page">

            <div className="task-container">

                {/* LEFT */}

                <div className="task-left">

                    <div className="task-card">

                        <p className="breadcrumb">
                            Dự án &gt; Khóa luận tốt nghiệp &gt; <span>Nộp báo cáo tiến độ</span>
                        </p>

                        <h2>Cập nhật tiến độ dự án</h2>

                        <p className="sub-title">
                            Hoàn thành các thông tin bên dưới để gửi báo cáo cho giảng viên hướng dẫn.
                        </p>

                        <div className="form-group">

                            <label>Giai đoạn báo cáo</label>

                            <select>

                                <option>Báo cáo tuần (Tuần 12)</option>
                                <option>Báo cáo tuần (Tuần 13)</option>
                                <option>Báo cáo giữa kỳ</option>
                                <option>Báo cáo cuối kỳ</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Tóm tắt công việc đã thực hiện</label>

                            <textarea
                                rows="8"
                                placeholder="Mô tả chi tiết các đầu việc đã hoàn thành, các khó khăn gặp phải và kế hoạch tiếp theo..."
                            />

                        </div>

                        <div className="button-group">

                            <button className="btn-outline">

                                <FaRegSave />

                                Lưu bản nháp

                            </button>

                            <button className="btn-primary">

                                <FaPaperPlane />

                                Nộp báo cáo

                            </button>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="task-right">

                    <div className="progress-card">

                        <h4>TIẾN ĐỘ CHUNG</h4>

                        <div className="progress-info">

                            <span>Hoàn thành dự án</span>

                            <span>75%</span>

                        </div>

                        <div className="progress">

                            <div
                                className="progress-bar"
                                style={{ width: "75%" }}
                            ></div>

                        </div>

                        <div className="summary-box">

                            <div>

                                <h2>12</h2>

                                <p>Đã nộp</p>

                            </div>

                            <div>

                                <h2>1</h2>

                                <p>Chờ duyệt</p>

                            </div>

                        </div>

                    </div>

                    <div className="history-card">

                        <div className="history-header">

                            <h4>Lịch sử nộp bài</h4>

                            <span>Xem tất cả</span>

                        </div>

                        <div className="history-item">

                            <h5>Báo cáo tuần 11</h5>

                            <span className="approved">Đã duyệt</span>

                            <p>Hoàn thành module UI cho trang...</p>

                            <small>

                                <FaCalendarAlt />

                                14/10/2023

                                &nbsp;&nbsp;

                                <FaFileAlt />

                                2 tệp

                            </small>

                        </div>

                        <div className="history-item">

                            <h5>Báo cáo tuần 10</h5>

                            <span className="approved">Đã duyệt</span>

                            <p>Xây dựng cấu trúc Database và kết nối...</p>

                            <small>

                                <FaCalendarAlt />

                                07/10/2023

                                &nbsp;&nbsp;

                                <FaFileAlt />

                                1 tệp

                            </small>

                        </div>

                        <div className="history-item">

                            <h5>Báo cáo giữa kỳ</h5>

                            <span className="approved">Đã duyệt</span>

                            <p>Tài liệu phân tích yêu cầu và thiết kế...</p>

                            <small>

                                <FaCalendarAlt />

                                30/09/2023

                                &nbsp;&nbsp;

                                <FaFileAlt />

                                5 tệp

                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TaskPage;