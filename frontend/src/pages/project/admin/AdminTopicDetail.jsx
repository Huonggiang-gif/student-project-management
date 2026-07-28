import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import topicService from "../../../services/topicService";

import StatusBadge from "../../../components/project/StatusBadge";

import "../../../styles/projectCreate.css";

function AdminTopicDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        loadTopic();
    }, []);

    async function loadTopic() {

        try {

            const topic = await topicService.getById(id);

            setTopic(topic);

        } catch (err) {

            console.log(err);

        }

    }

    if (!topic) {

        return (
            <div className="text-center mt-5">

                <h4>Đang tải...</h4>

            </div>
        );

    }

    return (

        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">

                    <h2>Chi tiết đề tài</h2>

                </div>

                <div className="project-card-body">

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <label>Tên đề tài</label>

                            <div className="form-control bg-light">

                                {topic.title}

                            </div>

                        </div>

                        <div className="col-md-6">

                            <label>Trạng thái</label>

                            <div>

                                <StatusBadge status={topic.status} />

                            </div>

                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <label>Sinh viên</label>

                            <div className="form-control bg-light">

                                {topic.student_name || "Chưa có"}

                            </div>

                        </div>

                        <div className="col-md-6">

                            <label>Giảng viên</label>

                            <div className="form-control bg-light">

                                {topic.lecturer_name || "Chưa có"}

                            </div>

                        </div>

                    </div>

                    <div className="mb-3">

                        <label>Mô tả</label>

                        <textarea
                            rows="6"
                            className="form-control"
                            value={topic.description || ""}
                            readOnly
                        />

                    </div>

                    <div className="mb-3">

                        <label>Ngày tạo</label>

                        <div className="form-control bg-light">

                            {new Date(topic.created_at).toLocaleDateString("vi-VN")}

                        </div>

                    </div>

                    <div className="d-flex justify-content-end gap-2">

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/project")}
                        >
                            Quay lại
                        </button>

                        <button
                            className="btn btn-warning"
                            onClick={() => navigate(`/project/edit/${id}`)}
                        >
                            Chỉnh sửa
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminTopicDetail;