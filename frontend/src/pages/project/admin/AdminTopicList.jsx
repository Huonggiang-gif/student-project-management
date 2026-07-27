import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import topicService from "../../../services/topicService";

import ProjectToolbar from "../../../components/project/ProjectToolbar";
import ProjectTable from "../../../components/project/ProjectTable";

import "../../../styles/topic.css";

function AdminTopicList() {

    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() => {

        loadTopics();

    }, []);

    async function loadTopics() {

        try {

            const res = await topicService.getAll();

            setTopics(res.data || []);

        } catch (err) {

            console.log(err);

            alert("Không thể tải danh sách đề tài");

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa đề tài này?"
        );

        if (!confirmDelete) return;

        try {

            await topicService.remove(id);

            alert("Xóa thành công");

            loadTopics();

        } catch (err) {

            console.log(err);

            alert("Xóa thất bại");

        }

    }

    async function handleApprove(id) {

        try {

            await topicService.approve(id);

            alert("Đã duyệt đề tài");

            loadTopics();

        } catch (err) {

            console.log(err);

            alert("Duyệt thất bại");

        }

    }

    async function handleReject(id) {

        try {

            await topicService.reject(id);

            alert("Đã từ chối đề tài");

            loadTopics();

        } catch (err) {

            console.log(err);

            alert("Từ chối thất bại");

        }

    }

    const filteredTopics = topics.filter((topic) => {

        const matchKeyword =
            topic.title
                .toLowerCase()
                .includes(keyword.toLowerCase());

        const matchStatus =
            status === "" ||
            topic.status === status;

        return matchKeyword && matchStatus;

    });

    return (

        <div className="topic-page">

            <div className="topic-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            Danh sách đề tài

                        </h2>

                        <small className="text-muted">

                            Tổng số: {filteredTopics.length}

                        </small>

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/project/create")}
                    >

                        + Thêm đề tài

                    </button>

                </div>

                <ProjectToolbar

                    keyword={keyword}

                    setKeyword={setKeyword}

                    status={status}

                    setStatus={setStatus}

                    role="admin"

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

export default AdminTopicList;