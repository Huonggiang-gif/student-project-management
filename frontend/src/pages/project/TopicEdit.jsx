import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import topicService from "../../services/topicService";
import "../../styles/projectCreate.css";

function TopicEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        title: "",
        description: "",
        lecturer_id: "",
        status: ""
    });

    useEffect(() => {
        loadTopic();
    }, []);

    const loadTopic = async () => {
        try {

            const res = await topicService.getById(id);

            setForm({
                title: res.data.title,
                description: res.data.description,
                lecturer_id: res.data.lecturer_id,
                status: res.data.status
            });

        } catch (err) {

            console.log(err);
            alert("Không thể tải đề tài.");

        }
    };

    const lockContent =
        (user.role === "lecturer" || user.role === "admin") &&
        (
            form.status === "approved" ||
            form.status === "in_progress" ||
            form.status === "completed"
        );

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            await topicService.update(id, form);

            alert("Cập nhật đề tài thành công!");

            navigate("/project");

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Có lỗi xảy ra.");
            }

        }

    };

    return (

        <div className="project-create-page">

            <div className="project-card">

                <div className="project-card-header">

                    <h2>✏️ Chỉnh sửa đề tài</h2>

                    <p>Cập nhật thông tin đề tài</p>

                </div>

                <div className="project-card-body">

                    {lockContent && (

                        <div
                            style={{
                                background: "#fff3cd",
                                color: "#856404",
                                padding: "10px",
                                borderRadius: "5px",
                                marginBottom: "20px"
                            }}
                        >
                            Đề tài đã được duyệt hoặc đang thực hiện nên không thể chỉnh sửa.
                        </div>

                    )}

                    <form onSubmit={submit}>

                        <div className="form-group">

                            <label>Tên đề tài</label>

                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={form.title}
                                onChange={handleChange}
                                disabled={lockContent}
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
                                disabled={lockContent}
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>ID Giảng viên</label>

                                <input
                                    type="number"
                                    name="lecturer_id"
                                    className="form-control"
                                    value={form.lecturer_id}
                                    onChange={handleChange}
                                    disabled={lockContent}
                                />

                            </div>

                            {user.role !== "student" && (

                                <div className="form-group">

                                    <label>Trạng thái</label>

                                    <select
                                        name="status"
                                        className="form-control"
                                        value={form.status}
                                        onChange={handleChange}
                                        disabled={lockContent}
                                    >

                                        <option value="pending">
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

                            )}

                        </div>

                        <div className="button-group">

                            <Link
                                to="/project"
                                className="btn-back"
                            >
                                ← Quay lại
                            </Link>

                            {!lockContent && (

                                <button
                                    type="submit"
                                    className="btn-save"
                                >
                                    💾 Cập nhật
                                </button>

                            )}

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default TopicEdit;