import "../../assets/styles/ProgressList.css";

function ProgressList({

    progress = [],

    loading,

    role,

    onDelete,

    onComment

}) {

    const colSpan = role === "student" ? 7 : 8;

    return (

        <table className="progress-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Đề tài</th>

                    <th>Sinh viên</th>

                    <th>Giảng viên</th>

                    <th>Tiến độ</th>

                    <th>Nhận xét</th>

                    <th>Ngày cập nhật</th>

                    <th>Trạng thái</th>

                    {role !== "student" && (

                        <th>Thao tác</th>

                    )}

                </tr>

            </thead>

            <tbody>

                {

                    loading ? (

                        <tr>

                            <td colSpan={colSpan}>

                                Đang tải dữ liệu...

                            </td>

                        </tr>

                    ) : progress.length === 0 ? (

                        <tr>

                            <td colSpan={colSpan}>

                                Chưa có tiến độ nào

                            </td>

                        </tr>

                    ) : (

                        progress.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.title}</td>

                                <td>{item.student_name}</td>

                                <td>
                                    {item.lecturer_comment || (
                                        <span className="no-comment">
                                            Chưa nhận xét
                                        </span>
                                    )}
                                </td>

                                <td>
                                    {item.description || (
                                        <span className="no-comment">
                                            Chưa cập nhật
                                        </span>
                                    )}
                                </td>

                                <td>

                                    {item.lecturer_comment || (
                                        <span className="no-comment">
                                            Chưa nhận xét
                                        </span>
                                    )}

                                </td>

                                <td>
                                    {item.updated_at
                                        ? new Date(item.updated_at).toLocaleString("vi-VN")
                                        : "--"}
                                </td>

                                <td>
                                    {item.status === "completed"
                                        ? "Đã hoàn thành"
                                        : "Đang thực hiện"}
                                </td>

                                {

                                    role !== "student" && (

                                        <td>

                                            <div className="action-btns">

                                                {

                                                    role === "lecturer" && (

                                                        <button

                                                            className="btn btn-primary"

                                                            onClick={() => onComment(item)}

                                                        >

                                                            Nhận xét

                                                        </button>

                                                    )

                                                }

                                                {

                                                    role === "admin" && (

                                                        <button

                                                            className="btn btn-danger"

                                                            onClick={() => onDelete(item.id)}

                                                        >

                                                            Xóa

                                                        </button>

                                                    )

                                                }

                                            </div>

                                        </td>

                                    )

                                }

                            </tr>

                        ))

                    )

                }

            </tbody>

        </table>

    );

}

export default ProgressList;