import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import topicService from "../../../services/topicService";
import StatusBadge from "../../../components/project/StatusBadge";

import "../../../styles/projectCreate.css";

function StudentTopicDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        loadTopic();
    }, []);

    async function loadTopic() {

        try {

            const data = await topicService.getById(id);

            setTopic(data);

        } catch (err) {

            console.log(err);

            alert("Không thể tải đề tài");

        }

    }

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

                    <h2>Đề tài của tôi</h2>

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

                            <StatusBadge status={topic.status} />

                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <label>Giảng viên hướng dẫn</label>

                            <div className="form-control bg-light">

                                {topic.lecturer_name || "Chưa có"}

                            </div>

                        </div>

                        <div className="col-md-6">

                            <label>Ngày tạo</label>

                            <div className="form-control bg-light">

                                {
                                    topic.created_at
                                        ? new Date(topic.created_at).toLocaleDateString("vi-VN")
                                        : ""
                                }

                            </div>

                        </div>

                    </div>

                    <div className="mb-3">

                        <label>Mô tả</label>

                        <textarea

                            className="form-control"

                            rows="6"

                            value={topic.description || ""}

                            readOnly

                        />

                    </div>

                    <div className="text-end">

                        <button

                            className="btn btn-secondary"

                            onClick={() => navigate("/student/project")}

                        >

                            Quay lại

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StudentTopicDetail;