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

    const loadTopics = async () => {
        try {
            const res = await topicService.getAll();

            // Sau này backend có API riêng thì thay bằng getByLecturer()
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
                    Đề tài hướng dẫn
                </h2>

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