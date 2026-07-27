import { useEffect, useState } from "react";

import EvaluationForm from "../components/evaluation/EvaluationForm";
import EvaluationList from "../components/evaluation/EvaluationList";

import { getEvaluations } from "../services/evaluationService";

function EvaluationPage() {

    const [topicId, setTopicId] = useState("");

    const [evaluations, setEvaluations] = useState([]);

    const [loading, setLoading] = useState(false);

    async function loadEvaluations() {

        if (!topicId) {

            setEvaluations([]);

            return;

        }

        try {

            setLoading(true);

            const data = await getEvaluations(topicId);

            setEvaluations(data);

        }

        catch (err) {

            console.log(err);

            alert("Không lấy được danh sách đánh giá");

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadEvaluations();

    }, [topicId]);

    return (

        <div className="evaluation-page">

            <h1>Evaluation Management</h1>

            <div
                style={{
                    marginBottom: "20px"
                }}
            >

                <label>

                    Topic ID

                </label>

                <br />

                <input
                    type="number"
                    placeholder="Nhập Topic ID..."
                    value={topicId}
                    onChange={(e) =>
                        setTopicId(e.target.value)
                    }
                    style={{
                        width: "250px",
                        padding: "10px",
                        marginTop: "8px"
                    }}
                />

                <button
                    className="btn btn-success"
                    onClick={loadEvaluations}
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    Refresh
                </button>

            </div>

            <EvaluationForm reload={loadEvaluations} />

            <hr
                style={{
                    margin: "30px 0"
                }}
            />

            <EvaluationList
                evaluations={evaluations}
                loading={loading}
                reload={loadEvaluations}
            />

        </div>

    );

}

export default EvaluationPage;