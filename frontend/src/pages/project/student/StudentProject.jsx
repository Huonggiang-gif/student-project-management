import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import topicService from "../../../services/topicService";

import ProjectToolbar from "../../../components/project/ProjectToolbar";
import ProjectTable from "../../../components/project/ProjectTable";

import "../../../styles/topic.css";

function StudentProject() {

    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {

        try {

            // API lấy đề tài của sinh viên
            const data = await topicService.getAll();

            setTopics(data);

        } catch (err) {

            console.log(err);

            setTopics([]);

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

                            Đề tài của tôi

                        </h2>

                        <small className="text-muted">

                            {filteredTopics.length} đề tài

                        </small>

                    </div>

                </div>

                <ProjectToolbar

                    keyword={keyword}

                    setKeyword={setKeyword}

                    status={status}

                    setStatus={setStatus}

                    role="student"

                    onCreate={() =>
                        navigate("/student/register-topic")
                    }

                />

                <ProjectTable

                    topics={filteredTopics}

                    role="student"

                />

            </div>

        </div>

    );

}

export default StudentProject;