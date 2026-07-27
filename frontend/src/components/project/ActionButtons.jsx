import { Link } from "react-router-dom";

function ActionButtons({
    topic,
    role,
    onDelete,
    onApprove,
    onReject
}) {

    return (

        <div className="d-flex justify-content-center">

            {/* Xem chi tiết */}

            <Link
                to={`/project/${topic.id}`}
                className="btn btn-outline-primary btn-sm me-1"
            >
                <i className="bi bi-eye"></i>
            </Link>

            {/* ================= ADMIN ================= */}

            {role === "admin" && (
                <>

                    <Link
                        to={`/project/edit/${topic.id}`}
                        className="btn btn-outline-warning btn-sm me-1"
                    >
                        <i className="bi bi-pencil"></i>
                    </Link>

                    <button
                        className="btn btn-outline-danger btn-sm me-1"
                        onClick={() => onDelete(topic.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>

                    {topic.status === "pending" && (
                        <>
                            <button
                                className="btn btn-success btn-sm me-1"
                                onClick={() => onApprove(topic.id)}
                            >
                                <i className="bi bi-check-lg"></i>
                            </button>

                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => onReject(topic.id)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </>
                    )}

                </>
            )}

            {/* ================= LECTURER ================= */}

            {role === "lecturer" && (
                <>

                    <Link
                        to={`/progress/${topic.id}`}
                        className="btn btn-outline-success btn-sm me-1"
                        title="Cập nhật tiến độ"
                    >
                        <i className="bi bi-graph-up"></i>
                    </Link>

                    <Link
                        to={`/evaluation/${topic.id}`}
                        className="btn btn-outline-info btn-sm"
                        title="Đánh giá"
                    >
                        <i className="bi bi-chat-left-text"></i>
                    </Link>

                </>
            )}

            {/* ================= STUDENT ================= */}

            {role === "student" &&
                (topic.status === "pending" ||
                    topic.status === "rejected") && (

                    <Link
                        to={`/project/edit/${topic.id}`}
                        className="btn btn-outline-warning btn-sm"
                    >
                        <i className="bi bi-pencil"></i>
                    </Link>

                )}

        </div>

    );

}

export default ActionButtons;