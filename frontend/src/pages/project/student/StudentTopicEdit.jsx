import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import topicService from "../../../services/topicService";

import "../../../styles/projectCreate.css";

function StudentTopicEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        lecturer_id: ""
    });

    const [status, setStatus] = useState("");

    useEffect(() => {
        loadTopic();
    }, []);

    async function loadTopic() {

        try {

            const topic = await topicService.getById(id);

            setForm({
                title: topic.title || "",
                description: topic.description || "",
                lecturer_id: topic.lecturer_id || ""
            });

            setStatus(topic.status);

        } catch (err) {

            console.log(err);

            alert("Không thể tải dữ liệu.");

        }

    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await topicService.update(id, form);

            alert("Cập nhật thành công.");

            navigate("/student/project");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Cập nhật thất bại."
            );

        }

    };

    const canEdit =
        status === "pending" ||
        status === "rejected";

    return (

        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">

                    <h2>Chỉnh sửa đề tài</h2>

                </div>

                <div className="project-card-body">

                    {!canEdit && (

                        <div className="alert alert-warning">

                            Đề tài đã được duyệt hoặc đang thực hiện nên không thể chỉnh sửa.

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Tên đề tài</label>

                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={form.title}
                                onChange={handleChange}
                                disabled={!canEdit}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Mô tả</label>

                            <textarea
                                rows="5"
                                name="description"
                                className="form-control"
                                value={form.description}
                                onChange={handleChange}
                                disabled={!canEdit}
                            />

                        </div>

                        <div className="form-group">

                            <label>ID Giảng viên</label>

                            <input
                                type="number"
                                name="lecturer_id"
                                className="form-control"
                                value={form.lecturer_id}
                                onChange={handleChange}
                                disabled={!canEdit}
                            />

                        </div>

                        <div className="button-group">

                            <Link
                                to="/student/project"
                                className="btn-back"
                            >
                                Quay lại
                            </Link>

                            {canEdit && (

                                <button
                                    type="submit"
                                    className="btn-save"
                                >
                                    Cập nhật
                                </button>

                            )}

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default StudentTopicEdit;