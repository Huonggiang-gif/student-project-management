import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import topicService from "../../services/topicService";
import StatusBadge from "../../components/project/StatusBadge";
import "../../styles/projectCreate.css";

function TopicDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        loadTopic();
    }, []);

    const loadTopic = async () => {

        try {

            const res = await topicService.getById(id);

            setTopic(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!topic) {

        return (
            <div className="text-center mt-5">
                <h4>Đang tải dữ liệu...</h4>
            </div>
        );

    }



    return (

        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">

                    <h2>📄 Chi tiết đề tài</h2>

                    <p>
                        Xem đầy đủ thông tin của đề tài.
                    </p>

                </div>

                <div className="project-card-body">

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Tên đề tài
                            </label>

                            <div className="form-control bg-light">
                                {topic.title}
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Trạng thái
                            </label>

                            <div>

                                <StatusBadge status={topic.status} />

                            </div>

                        </div>

                    </div>

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Sinh viên
                            </label>

                            <div className="form-control bg-light">
                                {topic.student_name}
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Giảng viên hướng dẫn
                            </label>

                            <div className="form-control bg-light">
                                {topic.lecturer_name}
                            </div>

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="fw-bold">
                            Mô tả đề tài
                        </label>

                        <textarea
                            className="form-control"
                            rows="6"
                            value={topic.description || ""}
                            readOnly
                        />

                    </div>

                    <div className="mb-4">

                        <label className="fw-bold">
                            Ngày tạo
                        </label>

                        <div className="form-control bg-light">

                            {topic.created_at
                                ? new Date(topic.created_at).toLocaleDateString("vi-VN")
                                : "Chưa có"}

                        </div>

                    </div>

                    <div className="d-flex justify-content-end gap-3">

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/project")}
                        >
                            ← Quay lại
                        </button>

                        <button
                            className="btn btn-warning"
                            onClick={() => navigate(`/project/edit/${id}`)}
                        >
                            ✏️ Chỉnh sửa
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TopicDetail;