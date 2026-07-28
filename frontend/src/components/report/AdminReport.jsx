import { useEffect ,useState } from "react";
import ReportSummary from "./ReportSummary";
import ReportTable from "./ReportTable";
import ViewReport from "./ViewReport";

import { getAllReports, getReport } from "../../services/reportService";
import "../../assets/styles/AdminReport.css"

function AdminReport() {

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    useEffect(() => {
        loadReports();
    }, []);
    async function loadReports() {
        try {
            const data = await getAllReports();

            console.log("ALL REPORTS:", data);

            setReports(data);

        } catch (error) {
            console.error(error);
        }
    }
    async function handleView(id) {
        try {
            const data = await getReport(id);
            setSelectedReport(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="admin-report">

            <h2>Báo cáo đề tài</h2>

            <input
                className="report-search"
                placeholder="Search student or topic..."
            />
            <ReportSummary reports={reports} />

            <ReportTable
                reports={reports}
                onView={handleView}
            />

            {
                selectedReport && (
                    <ViewReport
                        report={selectedReport}
                        onClose={() => setSelectedReport(null)}
                    />
                )
            }
        </div>
    );
}

export default AdminReport;