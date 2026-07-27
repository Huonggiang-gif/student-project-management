import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import topicService from "../../../services/topicService";

import ProjectToolbar from "../../../components/project/ProjectToolbar";
import ProjectTable from "../../../components/project/ProjectTable";

import "../../../styles/topic.css";

function AdminProject() {
    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {
        try {
            const res = await topicService.getAll();
            setTopics(res.data);
        } catch (err) {
            console.log(err);
            alert("Không thể tải danh sách đề tài");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa đề tài này?")) {
            return;
        }

        try {
            await topicService.remove(id);
            loadTopics();
        } catch (err) {
            console.log(err);
            alert("Xóa thất bại");
        }
    };

    const handleApprove = async (id) => {
        try {
            await topicService.approve(id);
            loadTopics();
        } catch (err) {
            console.log(err);
            alert("Duyệt thất bại");
        }
    };

    const handleReject = async (id) => {
        try {
            await topicService.reject(id);
            loadTopics();
        } catch (err) {
            console.log(err);
            alert("Từ chối thất bại");
        }
    };

    const filteredTopics = topics.filter((topic) => {
        const matchKeyword =
            topic.title.toLowerCase().includes(keyword.toLowerCase());

        const matchStatus =
            status === "" || topic.status === status;

        return matchKeyword && matchStatus;
    });

    return (
        <div className="topic-page">

            <div className="topic-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            Quản lý đề tài
                        </h2>

                        <small className="text-muted">
                            Danh sách đề tài ({filteredTopics.length})
                        </small>

                    </div>

                </div>

                <ProjectToolbar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    status={status}
                    setStatus={setStatus}
                    role="admin"
                    onCreate={() => navigate("/project/create")}
                />

                <ProjectTable
                    topics={filteredTopics}
                    role="admin"
                    onDelete={handleDelete}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />

            </div>

        </div>
    );
}

export default AdminProject;