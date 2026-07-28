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

            <Link

                to={`/project/${topic.id}`}

                className="btn btn-primary btn-sm"

            >

                Xem

            </Link>

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
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/lecturer/project/${topic.id}`)}
                        title="Xem chi tiết"
                    >
                        <i className="fas fa-eye"></i>
                    </button>

                    {/* Đánh giá */}
                    <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => navigate(`/evaluation/${topic.id}`)}
                        title="Đánh giá"
                    >
                        <i className="fas fa-star"></i>
                    </button>

                    {/* Duyệt */}
                    {topic.status === "pending" && (
                        <>
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => onApprove(topic.id)}
                                title="Duyệt"
                            >
                                <i className="fas fa-check"></i>
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onReject(topic.id)}
                                title="Từ chối"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </>
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