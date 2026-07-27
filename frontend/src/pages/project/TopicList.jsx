import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import topicService from "../../services/topicService";
import "../../styles/topic.css";

function TopicList() {
    const [topics, setTopics] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {
        try {
            const res = await topicService.getAll();
            setTopics(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa đề tài này?")) {
            await topicService.remove(id);
            loadTopics();
        }
    };

    const approve = async (id) => {
        await topicService.approve(id);
        loadTopics();
    };

    const reject = async (id) => {
        await topicService.reject(id);
        loadTopics();
    };

    const badgeColor = {
        pending: "warning",
        approved: "success",
        in_progress: "primary",
        completed: "secondary",
        rejected: "danger",
    };

    const statusText = {
        pending: "Chờ duyệt",
        approved: "Đã duyệt",
        in_progress: "Đang thực hiện",
        completed: "Hoàn thành",
        rejected: "Từ chối",
    };

    const filteredTopics = topics.filter((topic) => {
        return (
            topic.title.toLowerCase().includes(keyword.toLowerCase()) &&
            (status === "" || topic.status === status)
        );
    });

    return (
        <div className="topic-page">

            <div className="topic-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h2 className="fw-bold mb-1">
                            Quản lý đề tài
                        </h2>

                        <small className="text-muted">
                            Danh sách đề tài tốt nghiệp ({topics.length})
                        </small>
                    </div>

                    <Link
                        to="/project/create"
                        className="btn btn-danger"
                    >
                        <i className="bi bi-plus-lg"></i>
                        {" "}
                        Thêm đề tài
                    </Link>

                </div>

                <div className="row mb-4">

                    <div className="col-md-7">

                        <input
                            className="form-control"
                            placeholder="🔍 Tìm kiếm đề tài..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="pending">Chờ duyệt</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="in_progress">Đang thực hiện</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="rejected">Từ chối</option>
                        </select>

                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead className="table-light">

                            <tr>

                                <th>#</th>

                                <th>Tên đề tài</th>

                                <th>Sinh viên</th>

                                <th>Giảng viên</th>

                                <th>Trạng thái</th>

                                <th className="text-center">
                                    Thao tác
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredTopics.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-4"
                                    >
                                        Không có đề tài nào
                                    </td>

                                </tr>

                            ) : (

                                filteredTopics.map((topic, index) => (

                                    <tr key={topic.id}>

                                        <td>{index + 1}</td>

                                        <td>

                                            <strong>
                                                {topic.title}
                                            </strong>

                                            <br />

                                            <small className="text-muted">
                                                ID: {topic.id}
                                            </small>

                                        </td>

                                        <td>

                                            <div className="d-flex align-items-center">

                                                <div className="student-avatar">

                                                    {topic.student_name
                                                        ?.charAt(0)
                                                        .toUpperCase()}

                                                </div>

                                                <div className="ms-2">

                                                    <strong>
                                                        {topic.student_name}
                                                    </strong>

                                                    <br />

                                                    <small className="text-muted">
                                                        {topic.student_code}
                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            {topic.lecturer_name}

                                        </td>

                                        <td>

                                            <span
                                                className={`badge bg-${badgeColor[topic.status]}`}
                                            >
                                                {statusText[topic.status]}
                                            </span>

                                        </td>

                                        <td className="text-center">

                                            <Link
                                                to={`/project/${topic.id}`}
                                                className="btn btn-outline-primary btn-sm me-1"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </Link>

                                            <Link
                                                to={`/project/edit/${topic.id}`}
                                                className="btn btn-outline-warning btn-sm me-1"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Link>

                                            <button
                                                className="btn btn-outline-danger btn-sm me-1"
                                                onClick={() => handleDelete(topic.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                            {topic.status === "pending" && (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm me-1"
                                                        onClick={() => approve(topic.id)}
                                                    >
                                                        <i className="bi bi-check-lg"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => reject(topic.id)}
                                                    >
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </>
                                            )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default TopicList;