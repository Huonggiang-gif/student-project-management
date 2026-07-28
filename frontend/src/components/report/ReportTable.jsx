function ReportTable({ reports, onView }) {

    return (

        <table className="report-table">

            <thead>

                <tr>
                    <th>Sinh viên</th>
                    <th>Đề tài</th>
                    <th>Giảng viên</th>
                    <th>Ngày nộp</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>

            </thead>

            <tbody>

                {
                    reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.student_name}</td>
                            <td>{report.topic_title}</td>
                            <td>{report.lecturer_name || "chưa phân công"}</td>
                            <td>
                                {new Date(report.submitted_at).toLocaleDateString("vi-VN")}
                            </td>
                            <td>
                                <span className={report.status.toLowerCase()}>
                                    {report.status}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="view-btn"
                                    onClick={() => onView(report.id)}
                                >
                                    Xem
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );

}

export default ReportTable;