import { useEffect, useState } from "react";
import "../../assets/styles/StudentReport.css"
import { getLecturerReports} from "../../services/reportService";
import { getEvaluation } from "../../services/evaluationService";
import ReviewForm from "./ReviewForm";
import ViewReview from "./ViewReview";
import EditEvaluation from "./EditEvaluation";
function LecturerReport() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [editEvaluation, setEditEvaluation] = useState(null);
    useEffect(() => {loadReports();}, []);

    async function loadReports(){
        try {
            const data = await getLecturerReports();
            setReports(data);
        } catch(error){
            console.log(error);
        }
    }
    
    function handleView(file_url){

        window.open(
            `http://localhost:3000${file_url}`,
            "_blank"
        );

    }
    async function handleViewEvaluation(report) {
        try {
            const data = await getEvaluation(report.topic_id);

            if (data && data.length > 0) {
                // Đã có đánh giá -> Mở modal xem (ViewReview)
                setSelectedEvaluation(data[0]);
            } else {
                // Chưa có đánh giá -> Tự động chuyển sang modal Đánh giá (ReviewForm)
                setSelectedEvaluation(null);
                alert("Đề tài này chưa có đánh giá. Chuyển sang trang tạo đánh giá!");
                setSelectedReport(report); 
            }

        } catch (error) {
            console.log("Lỗi lấy đánh giá:", error);
        }
    }
   
    return (
        <div className="report-container">
            <h2 className="report-title">
                Báo cáo đồ án
            </h2>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Topic</th>
                        <th>File</th>
                        <th>Submitted</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {reports.length === 0 ? (

                        <tr>
                            <td colSpan="7">
                                Chưa có báo cáo nào
                            </td>
                        </tr>

                    ) : (

                        reports.map(report => (

                            <tr key={report.id}>

                                <td>{report.id}</td>

                                <td>{report.student}</td>

                                <td>{report.topic}</td>

                                <td>{report.file_name}</td>

                                <td>{report.submitted_at}</td>

                                <td>{report.status}</td>

                                <td>

                                    <button 
                                        className="btn btn-success"
                                        onClick={() => handleView(report.file_url)}
                                    >
                                        View
                                    </button>

                                    {report.status === "pending" ? (

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setSelectedReport(report)}
                                        >
                                            Review
                                        </button>

                                    ) : (

                                        <button
                                            className="btn btn-info"
                                            onClick={() => handleViewEvaluation(report)}
                                        >
                                            View Review
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>
            {
                selectedReport && (
                    <ReviewForm

                        topic_id={selectedReport.topic_id}

                        onClose={() => setSelectedReport(null)}

                        onSuccess={() => {

                            setSelectedReport(null);
                            loadReports();

                        }}

                    />

                )
            }

            {selectedEvaluation && (
                <ViewReview
                    evaluation={selectedEvaluation}
                    onClose={() => setSelectedEvaluation(null)}
                    reload={loadReports}
                    onEdit={(evalData) => {
                        setSelectedEvaluation(null); // Đóng modal Xem
                        setEditEvaluation(evalData);  // Mở modal Sửa
                    }}
                />
            )}
            {
                editEvaluation && (
                    <EditEvaluation
                        evaluation={editEvaluation}
                        onClose={() => setEditEvaluation(null)}
                        onSuccess={() => {
                            setEditEvaluation(null);
                            loadReports();
                        }}
                    />
                )
            }
        </div>
    );

}
export default LecturerReport;