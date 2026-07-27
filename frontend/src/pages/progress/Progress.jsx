import { useEffect, useState } from "react";
import progressService from "../../services/progressService";
import "../../styles/Progress.css";

function Progress() {
    const [progressList, setProgressList] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const res = await progressService.getAll();
            setProgressList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const submit = async () => {
        if (description.trim() === "") {
            alert("Vui lòng nhập nội dung báo cáo.");
            return;
        }

        const data = {
            topic_id: 1,
            description: description,
            lecturer_comment: ""
        };

        await progressService.create(data);

        alert("Nộp báo cáo thành công");

        setDescription("");

        loadProgress();
    };

    return (
        <div className="progress-page">

            <div className="progress-left">

                <div className="progress-card">

                    <h2>Cập nhật tiến độ dự án</h2>

                    <p>
                        Hoàn thành các thông tin bên dưới để gửi báo cáo cho
                        giảng viên hướng dẫn.
                    </p>

                    <label>Giai đoạn báo cáo</label>

                    <select className="form-control">

                        <option>Báo cáo tuần</option>

                        <option>Báo cáo giữa kỳ</option>

                        <option>Báo cáo cuối kỳ</option>

                    </select>

                    <label>Tóm tắt công việc đã thực hiện</label>

                    <textarea
                        rows="8"
                        className="form-control"
                        placeholder="Mô tả công việc đã hoàn thành..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="button-group">

                        <button className="draft-btn">
                            Lưu bản nháp
                        </button>

                        <button
                            className="submit-btn"
                            onClick={submit}
                        >
                            Nộp báo cáo
                        </button>

                    </div>

                </div>

            </div>

            <div className="progress-right">

                <div className="progress-summary">

                    <h4>TIẾN ĐỘ CHUNG</h4>

                    <p>Hoàn thành dự án</p>

                    <div className="progress">

                        <div
                            className="progress-bar"
                            style={{ width: "75%" }}
                        >
                            75%
                        </div>

                    </div>

                    <div className="summary-box">

                        <div>

                            <h2>{progressList.length}</h2>

                            <span>Đã nộp</span>

                        </div>

                        <div>

                            <h2>1</h2>

                            <span>Chờ duyệt</span>

                        </div>

                    </div>

                </div>

                <div className="history-card">

                    <div className="history-header">

                        <h4>Lịch sử nộp bài</h4>

                    </div>

                    {progressList.map((item) => (

                        <div
                            key={item.id}
                            className="history-item"
                        >

                            <h5>{item.topic_title}</h5>

                            <p>{item.description}</p>

                            <small>

                                Nhận xét:

                                <span className="text-success">

                                    {" "}

                                    {item.lecturer_comment}

                                </span>

                            </small>

                            <br />

                            <small>

                                {new Date(
                                    item.updated_at
                                ).toLocaleDateString("vi-VN")}

                            </small>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Progress;