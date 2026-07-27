import { useEffect, useState } from "react";
import {
    getReports,
    uploadReport,
    deleteReport
} from "../../services/reportService";

import "../../assets/styles/StudentReport.css";

function StudentReport() {

    const [topicId, setTopicId] = useState("");

    const [file, setFile] = useState(null);

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(false);

    const [loadingTable, setLoadingTable] = useState(false);

    async function loadReports() {

        if (!topicId) {
            setReports([]);
            return;
        }

        try {

            setLoadingTable(true);

            const data = await getReports(topicId);

            setReports(data);

        } catch (err) {

            console.log(err);

            alert("Không lấy được danh sách báo cáo");

        } finally {

            setLoadingTable(false);

        }

    }

    useEffect(() => {

        loadReports();

    }, [topicId]);

    async function handleUpload() {

        if (!topicId) {

            alert("Vui lòng nhập Topic ID");

            return;

        }

        if (!file) {

            alert("Vui lòng chọn file PDF");

            return;

        }

        try {

            setLoading(true);

            await uploadReport(topicId, file);

            alert("Nộp báo cáo thành công");

            setFile(null);

            document.getElementById("reportFile").value = "";

            await loadReports();

        } catch (err) {

            console.log(err);

            alert("Upload thất bại");

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa báo cáo?"
        );

        if (!confirmDelete) return;

        try {

            await deleteReport(id);

            alert("Xóa thành công");

            loadReports();

        } catch (err) {

            console.log(err);

            alert("Không thể xóa");

        }

    }

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
                        Need Revision
                    </span>
                );

            default:

                return status;

        }

    }

    return (

        <div className="report-container">

            <h2 className="report-title">

                Student Report

            </h2>

            <div className="report-form">

                <div className="form-group">

                    <label>

                        Topic ID

                    </label>

                    <input
                        type="number"
                        placeholder="Nhập Topic ID..."
                        value={topicId}
                        onChange={(e) =>
                            setTopicId(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>

                        PDF Report

                    </label>

                    <input
                        id="reportFile"
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setFile(e.target.files[0])
                        }
                    />

                </div>

                <div className="button-group">

                    <button
                        className="btn btn-primary"
                        disabled={loading}
                        onClick={handleUpload}
                    >

                        {loading
                            ? "Uploading..."
                            : "Upload Report"}

                    </button>

                    <button
                        className="btn btn-success"
                        onClick={loadReports}
                    >

                        Refresh

                    </button>

                </div>

            </div>

            <hr />
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

                        loadingTable ?

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

                                        <td>

                                            {report.id}

                                        </td>

                                        <td>

                                            {report.file_name}

                                        </td>

                                        <td>

                                            {report.file_size}

                                        </td>

                                        <td>

                                            {

                                                new Date(
                                                    report.submitted_at
                                                ).toLocaleString()

                                            }

                                        </td>

                                        <td>

                                            {

                                                getStatus(
                                                    report.status
                                                )

                                            }

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

                                                    onClick={() =>
                                                        handleDelete(report.id)
                                                    }

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

        </div>

    );

}

export default StudentReport;