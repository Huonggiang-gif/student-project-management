import "../../assets/styles/ProgressList.css";

function ProgressList({
    progress,
    loading,
    onDelete,
    onComment
}) {

    return (

        <table className="progress-table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Mô tả tiến độ</th>
                    <th>Nhận xét GV</th>
                    <th>Ngày cập nhật</th>
                    <th>Thao tác</th>

                </tr>

            </thead>

            <tbody>

                {

                    loading ?

                        (

                            <tr>

                                <td colSpan="5">

                                    Đang tải dữ liệu...

                                </td>

                            </tr>

                        )

                        :

                        progress.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="5">

                                        Chưa có tiến độ nào

                                    </td>

                                </tr>

                            )

                            :

                            progress.map((item) => (

                                <tr key={item.id}>

                                    <td>

                                        {item.id}

                                    </td>

                                    <td>

                                        {item.description}

                                    </td>

                                    <td>

                                        {

                                            item.lecturer_comment ||

                                            <span className="no-comment">

                                                Chưa nhận xét

                                            </span>

                                        }

                                    </td>

                                    <td>

                                        {

                                            new Date(
                                                item.updated_at
                                            ).toLocaleString()

                                        }

                                    </td>

                                    <td>

                                        <div className="action-btns">

                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    onComment(item)
                                                }
                                            >
                                                Nhận xét
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    onDelete(item.id)
                                                }
                                            >
                                                Xóa
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                }

            </tbody>

        </table>

    );

}

export default ProgressList;