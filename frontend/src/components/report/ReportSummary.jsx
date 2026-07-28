import { FaFileAlt, FaUpload, FaClipboardCheck,FaClock} from "react-icons/fa";

function ReportSummary({ reports }) {

    const total = reports.length;

    const submitted = reports.filter(
        r => r.status === "submitted"
    ).length;

    const evaluated = reports.filter(
        r => r.status === "reviewed"
    ).length;

    const pending = reports.filter(
        r => r.status === "needs_revision"
    ).length;

    return (

          <div className="summary-container">

            <div className="summary-card">

                <div className="card-icon total-icon">
                    <FaFileAlt />
                </div>

                <div>
                    <h4>Tổng báo cáo</h4>
                    <span>{total}</span>
                </div>

            </div>

            <div className="summary-card">

                <div className="card-icon submit-icon">
                    <FaUpload />
                </div>

                <div>
                    <h4>Đã nộp</h4>
                    <span>{submitted}</span>
                </div>

            </div>

            <div className="summary-card">

                <div className="card-icon evaluate-icon">
                    <FaClipboardCheck />
                </div>

                <div>
                    <h4>Đã đánh giá</h4>
                    <span>{evaluated}</span>
                </div>

            </div>

            <div className="summary-card">

                <div className="card-icon pending-icon">
                    <FaClock />
                </div>

                <div>
                    <h4>Chưa đánh giá</h4>
                    <span>{pending}</span>
                </div>

            </div>

        </div>

    );

}

export default ReportSummary;