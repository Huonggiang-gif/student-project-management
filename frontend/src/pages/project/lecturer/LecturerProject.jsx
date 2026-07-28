import { useEffect, useState } from "react";
import topicService from "../../../services/topicService";

import ProjectToolbar from "../../../components/project/ProjectToolbar";
import ProjectTable from "../../../components/project/ProjectTable";

import "../../../styles/topic.css";

function LecturerProject() {

    const [topics, setTopics] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() => {
        loadTopics();
    }, []);

    async function loadTopics() {

        try {
            // Khi có API riêng:
            // topicService.getLecturerTopics();
            const data = await topicService.getAll();

            setTopics(data);

        } catch (err) {

            console.log(err);

        }

    }

    const filteredTopics = topics.filter((topic) => {

        const matchKeyword =
            topic.title.toLowerCase().includes(
                keyword.toLowerCase()
            );

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

                            Đề tài hướng dẫn

                        </h2>

                        <small className="text-muted">

                            Tổng số: {filteredTopics.length}

                        </small>

                    </div>

                </div>

                <ProjectToolbar

                    keyword={keyword}
                    setKeyword={setKeyword}

                    status={status}
                    setStatus={setStatus}

                    role="lecturer"

                />

                <ProjectTable

                    topics={filteredTopics}

                    role="lecturer"

                />

            </div>

        </div>

    );

}

export default LecturerProject;