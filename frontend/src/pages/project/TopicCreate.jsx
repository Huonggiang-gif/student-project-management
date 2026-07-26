import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import topicService from "../../services/topicService";
import "../../styles/projectCreate.css";

function TopicCreate() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        student_id: "",
        lecturer_id: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            await topicService.create(form);

            alert("Thêm đề tài thành công!");

            navigate("/project");

        } catch (error) {

            console.log(error);

            alert("Thêm đề tài thất bại!");

        }

    };

    return (

        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">

                    <h2>📁 Thêm đề tài mới</h2>

                    <p>
                        Nhập đầy đủ thông tin đề tài trước khi lưu.
                    </p>

                </div>

                <div className="project-card-body">

                    <form onSubmit={submit}>

                        <div className="form-group">

                            <label>Tên đề tài</label>

                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Ví dụ: Website Quản lý đồ án sinh viên"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Mô tả đề tài</label>

                            <textarea
                                rows="5"
                                name="description"
                                className="form-control"
                                placeholder="Nhập mô tả đề tài..."
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>ID Sinh viên</label>

                                <input
                                    type="number"
                                    name="student_id"
                                    className="form-control"
                                    placeholder="Ví dụ: 1"
                                    value={form.student_id}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>ID Giảng viên</label>

                                <input
                                    type="number"
                                    name="lecturer_id"
                                    className="form-control"
                                    placeholder="Ví dụ: 3"
                                    value={form.lecturer_id}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="button-group">

                            <Link
                                to="/project"
                                className="btn-back"
                            >
                                ← Quay lại
                            </Link>

                            <button
                                type="submit"
                                className="btn-save"
                            >
                                💾 Lưu đề tài
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default TopicCreate;