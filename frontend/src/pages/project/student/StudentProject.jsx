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

            const res = await topicService.getAll();

            // Sau này backend có API của sinh viên thì thay

            setTopics(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const filteredTopics = topics.filter((topic) => {

        return (

            topic.title.toLowerCase().includes(keyword.toLowerCase()) &&

            (status === "" || topic.status === status)

        );

    });

    return (

        <div className="topic-page">

            <div className="topic-card">

                <h2 className="fw-bold">

                    Đề tài của tôi

                </h2>

                <ProjectToolbar

                    keyword={keyword}
                    setKeyword={setKeyword}

                    status={status}
                    setStatus={setStatus}

                    role="student"

                    onCreate={() => navigate("/project/create")}

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