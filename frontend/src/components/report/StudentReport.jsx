import { useEffect, useState } from "react";
import {
    getReports,
    uploadReport,
    deleteReport
} from "../../services/reportService";

import ReportList from "./ReportList";
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

            await loadReports();

        } catch (err) {

            console.log(err);

            alert("Không thể xóa");

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

            <ReportList
                reports={reports}
                loading={loadingTable}
                onDelete={handleDelete}
            />

        </div>

    );

}

export default StudentReport;