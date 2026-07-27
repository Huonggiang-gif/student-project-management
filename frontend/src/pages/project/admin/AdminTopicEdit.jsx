import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import topicService from "../../../services/topicService";

import "../../../styles/projectCreate.css";

function AdminTopicEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        lecturer_id: "",
        status: ""
    });

    useEffect(() => {
        loadTopic();
    }, []);

    async function loadTopic() {

        try {

            const topic = await topicService.getById(id);

            setForm({
                title: topic.title,
                description: topic.description,
                lecturer_id: topic.lecturer_id,
                status: topic.status
            });

        } catch (err) {

            console.log(err);

            alert("Không tải được đề tài");

        }

    }

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    async function submit(e) {

        e.preventDefault();

        try {

            await topicService.update(id, form);

            alert("Cập nhật thành công");

            navigate("/project");

        } catch (err) {

            console.log(err);

            alert("Cập nhật thất bại");

        }

    }

    return (

        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">

                    <h2>Chỉnh sửa đề tài</h2>

                </div>

                <div className="project-card-body">

                    <form onSubmit={submit}>

                        <div className="form-group">

                            <label>Tên đề tài</label>

                            <input
                                className="form-control"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Mô tả</label>

                            <textarea
                                rows="5"
                                className="form-control"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>ID giảng viên</label>

                            <input
                                type="number"
                                className="form-control"
                                name="lecturer_id"
                                value={form.lecturer_id}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Trạng thái</label>

                            <select
                                className="form-control"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >

                                <option value="pending">
                                    Chờ đăng ký
                                </option>

                                <option value="waiting_approval">
                                    Chờ duyệt
                                </option>

                                <option value="approved">
                                    Đã duyệt
                                </option>

                                <option value="in_progress">
                                    Đang thực hiện
                                </option>

                                <option value="completed">
                                    Hoàn thành
                                </option>

                                <option value="rejected">
                                    Từ chối
                                </option>

                            </select>

                        </div>

                        <div className="button-group">

                            <Link
                                to="/project"
                                className="btn-back"
                            >
                                Quay lại
                            </Link>

                            <button
                                className="btn-save"
                                type="submit"
                            >
                                Cập nhật
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AdminTopicEdit;