import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import topicService from "../../../services/topicService";
import "../../../styles/projectCreate.css";

function AdminTopicCreate() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: ""
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

            alert("Tạo đề tài thành công!");

            navigate("/admin/project");

        } catch (error) {

            console.log(error);

            alert("Tạo đề tài thất bại!");

        }

    };

    return (
        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">
                    <h2>Thêm đề tài</h2>
                </div>

                <div className="project-card-body">

                    <form onSubmit={submit}>

                        <div className="form-group">
                            <label>Tên đề tài</label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">

                            <label>Mô tả</label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="form-control"
                            />

                        </div>

                        <div className="button-group">

                            <Link
                                to="/admin/project"
                                className="btn-back"
                            >
                                Quay lại
                            </Link>

                            <button
                                className="btn-save"
                                type="submit"
                            >
                                Lưu
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AdminTopicCreate;