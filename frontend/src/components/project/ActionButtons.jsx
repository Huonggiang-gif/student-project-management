import { Link, useNavigate } from "react-router-dom";

function ActionButtons({

    topic,

    role,

    onDelete,

    onApprove,

    onReject

}) {
    const navigate = useNavigate();
    return (

        <div className="d-flex gap-2">

            {/* Chi tiết */}

            {/* ================= ADMIN ================= */}

            {

                role === "admin" &&

                <>

                    <Link

                        to={`/project/edit/${topic.id}`}

                        className="btn btn-warning btn-sm"

                    >

                        Sửa

                    </Link>

                    <button

                        className="btn btn-danger btn-sm"

                        onClick={() => onDelete(topic.id)}

                    >

                        Xóa

                    </button>

                    {

                        topic.status === "waiting_approval" &&

                        <>

                            <button

                                className="btn btn-success btn-sm"

                                onClick={() => onApprove(topic.id)}

                            >

                                Duyệt

                            </button>

                            <button

                                className="btn btn-secondary btn-sm"

                                onClick={() => onReject(topic.id)}

                            >

                                Từ chối

                            </button>

                        </>

                    }

                </>

            }

            {/* ================= LECTURER ================= */}

            {role === "lecturer" && (
                <>
                    {/* Xem chi tiết */}
                    <Link
                        to={`/lecturer/project/${topic.id}`}
                        className="btn btn-outline-primary btn-sm"
                        title="Xem chi tiết"
                    >
                        <i className="bi bi-eye"></i>
                    </Link>

                    {/* tiến độ dự án */}
                    <Link
                        to={`/progress/${topic.id}`}
                        className="btn btn-outline-info btn-sm"
                        title="Tiến độ dự án"
                    >
                        <i className="fas fa-chart-line"></i>
                    </Link>

                    {/* Duyệt */}
                    {topic.status === "waiting_approval" && (
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => onApprove(topic.id)}
                            title="Duyệt"
                        >
                            <i className="bi bi-check-lg"></i>
                        </button>
                    )}

                    {/* Từ chối */}
                    {topic.status === "waiting_approval" && (
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onReject(topic.id)}
                            title="Từ chối"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}

                </>
            )}

            {/* ================= STUDENT ================= */}

            {

                role === "student" &&

                topic.status === "rejected" &&

                <Link

                    to={`/student/project/edit/${topic.id}`}

                    className="btn btn-warning btn-sm"

                >

                    Sửa

                </Link>

            }

        </div>

    );

}

export default ActionButtons;