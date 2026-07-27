import "../../assets/styles/ReportList.css";

function ReportList({
    reports,
    loading,
    onDelete
}) {

    function getStatus(status) {

        switch (status) {

            case "submitted":
                return (
                    <span className="status-submitted">
                        Submitted
                    </span>
                );

            case "reviewed":
                return (
                    <span className="status-reviewed">
                        Reviewed
                    </span>
                );

            case "needs_revision":
                return (
                    <span className="status-revision">
                        Needs Revision
                    </span>
                );

            default:
                return status;
        }

    }

    return (

        <table className="report-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>File</th>

                    <th>Size</th>

                    <th>Submitted</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    loading ?

                        (

                            <tr>

                                <td colSpan="6">

                                    Đang tải dữ liệu...

                                </td>

                            </tr>

                        )

                        :

                        reports.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="6">

                                        Chưa có báo cáo nào

                                    </td>

                                </tr>

                            )

                            :

                            reports.map((report) => (

                                <tr key={report.id}>

                                    <td>{report.id}</td>

                                    <td>{report.file_name}</td>

                                    <td>{report.file_size}</td>

                                    <td>
                                        {new Date(
                                            report.submitted_at
                                        ).toLocaleString()}
                                    </td>

                                    <td>

                                        {getStatus(report.status)}

                                    </td>

                                    <td>

                                        <div className="action-btns">

                                            <a
                                                href={`http://localhost:3000${report.file_url}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-success"
                                            >
                                                View
                                            </a>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => onDelete(report.id)}
                                            >
                                                Delete
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

export default ReportList;