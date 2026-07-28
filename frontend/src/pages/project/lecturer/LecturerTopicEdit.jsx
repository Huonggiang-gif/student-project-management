import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import topicService from "../../../services/topicService";

import "../../../styles/projectCreate.css";

function LecturerTopicEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        loadTopic();
    }, []);

    async function loadTopic() {

        try {

            const res = await topicService.getById(id);

            setForm({
                title: res.data.title,
                description: res.data.description
            });

        } catch (err) {

            console.log(err);

        }

    }

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await topicService.update(id, form);

            alert("Cập nhật thành công");

            navigate("/lecturer/project");

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

                    <form onSubmit={handleSubmit}>

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

                        <div className="button-group">

                            <Link
                                to="/lecturer/project"
                                className="btn-back"
                            >
                                Quay lại
                            </Link>

                            <button
                                type="submit"
                                className="btn-save"
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

export default LecturerTopicEdit;