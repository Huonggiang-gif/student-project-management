import { useEffect, useState } from "react";
import { getReports,uploadReport,deleteReport} from "../../services/reportService";
import { getEvaluation } from "../../services/evaluationService";
import ViewReview from "./ViewReview";
import "../../assets/styles/StudentReport.css";

function StudentReport() {

const user = JSON.parse(localStorage.getItem("user") || "{}");

const topic_id = user?.topic_id || user?.topicId || user?.topic?.id || "";

    const [file, setFile] = useState(null);

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(false);

    const [loadingTable, setLoadingTable] = useState(false);

    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    async function handleViewReview() {
        if (!topic_id) {
            alert("Không tìm thấy đề tài của tài khoản này!");
            return;
        }

        try {
            const data = await getEvaluation(topic_id);
            const evaluationData = Array.isArray(data) ? data[0] : data;

            if (!evaluationData || (Array.isArray(data) && data.length === 0)) {
                alert("Giảng viên chưa gửi đánh giá cho đề tài này!");
                return;
            }
            console.log("Dữ liệu Đánh giá từ Backend:", evaluationData);

            setSelectedEvaluation(evaluationData);
            setShowModal(true);
        } catch (err) {
            console.log(err);
            alert("Không thể tải thông tin đánh giá!");
        }
    }
    async function loadReports() {
        if (!topic_id) {
            setReports([]);
            return;
        }
        try {
            setLoadingTable(true);
            const data = await getReports(topic_id);
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
    }, [topic_id]);
    async function handleUpload() {
        if (!topic_id) {
            alert("Không tìm thấy thông tin đề tài của tài khoản này!");
            return;
        }
        if (!file) {
            alert("Vui lòng chọn file PDF");
            return;
        }
        try {
            setLoading(true);
            await uploadReport(topic_id, file);
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
                                                    className="btn btn-info"
                                                    onClick={handleViewReview}
                                                >
                                                    View Review
                                                </button>
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
            {showModal && selectedEvaluation && (
                <ViewReview
                    evaluation={selectedEvaluation}
                    onClose={() => setShowModal(false)}
                    readOnly={true}
                />
            )}
        </div>

    );

}

export default StudentReport;