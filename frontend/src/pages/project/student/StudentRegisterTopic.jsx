import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import topicService from "../../../services/topicService";
import { getLecturers } from "../../../services/userService";

function StudentRegisterTopic() {

    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);

    const [lecturers, setLecturers] = useState([]);

    const [form, setForm] = useState({
        topic_id: "",
        lecturer_id: ""
    });

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const topics = await topicService.getAvailableTopics();

            const lecturers = await getLecturers();

            setTopics(topics);

            setLecturers(lecturers);

        } catch (err) {

            console.log(err);

            alert("Không tải được dữ liệu.");

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

        if (!form.topic_id) {

            alert("Vui lòng chọn đề tài");

            return;

        }

        if (!form.lecturer_id) {

            alert("Vui lòng chọn giảng viên");

            return;

        }

        try {

            await topicService.registerTopic(form);

            alert("Đăng ký đề tài thành công");

            navigate("/student/project");

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Đăng ký thất bại"
            );

        }

    }

    return (

        <div className="container mt-4">

            <div className="card">

                <div className="card-header d-flex align-items-center">

                    <button
                        type="button"
                        className="btn btn-link text-dark me-2"
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left fs-4"></i>
                    </button>

                    <h3 className="mb-0">
                        Đăng ký đề tài
                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Đề tài</label>

                            <select
                                className="form-control"
                                name="topic_id"
                                value={form.topic_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    -- Chọn đề tài --
                                </option>

                                {topics.map(topic => (

                                    <option
                                        key={topic.id}
                                        value={topic.id}
                                    >

                                        {topic.title}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="mb-3">

                            <label>Giảng viên hướng dẫn</label>

                            <select
                                className="form-control"
                                name="lecturer_id"
                                value={form.lecturer_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    -- Chọn giảng viên --
                                </option>

                                {lecturers.map(item => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {item.full_name}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >

                            Đăng ký đề tài

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default StudentRegisterTopic;