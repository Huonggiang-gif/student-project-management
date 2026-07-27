import { useEffect, useState } from "react";
import {
    getReports,
    updateStatus
} from "../../services/reportService";

import ReportList from "./ReportList";

function TeacherReport() {

    const [topicId, setTopicId] = useState("");

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(false);

    async function loadReports() {

        if (!topicId) {

            setReports([]);

            return;

        }

        try {

            setLoading(true);

            const data = await getReports(topicId);

            setReports(data);

        }

        catch (err) {

            console.log(err);

            alert("Không tải được báo cáo");

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadReports();

    }, [topicId]);

    async function handleStatus(id, status) {

        try {

            await updateStatus(id, status);

            alert("Cập nhật thành công");

            loadReports();

        }

        catch (err) {

            console.log(err);

            alert("Không cập nhật được");

        }

    }

    return (

        <div className="report-container">

            <h2 className="report-title">

                Teacher Report

            </h2>

            <div className="report-form">

                <input
                    type="number"
                    placeholder="Nhập Topic ID..."
                    value={topicId}
                    onChange={(e) =>
                        setTopicId(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={loadReports}
                >
                    Load Reports
                </button>

            </div>

            <ReportList
                reports={reports}
                loading={loading}
                onDelete={() => {}}
            />

            <br />

            {

                reports.map((report) => (

                    <div
                        key={report.id}
                        style={{
                            marginBottom: "12px"
                        }}
                    >

                        <strong>

                            Report #{report.id}

                        </strong>

                        {" "}

                        <button
                            className="btn btn-success"
                            onClick={() =>
                                handleStatus(
                                    report.id,
                                    "reviewed"
                                )
                            }
                        >
                            Reviewed
                        </button>

                        {" "}

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                handleStatus(
                                    report.id,
                                    "needs_revision"
                                )
                            }
                        >
                            Need Revision
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default TeacherReport;