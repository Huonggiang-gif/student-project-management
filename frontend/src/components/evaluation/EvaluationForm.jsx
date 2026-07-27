import { useState } from "react";
import { createEvaluation } from "../../services/evaluationService";
import "../../assets/styles/Evaluation.css";

function EvaluationForm({ reload }) {

    const [form, setForm] = useState({

        topic_id: "",

        lecturer_id: "",

        report_score: "",

        demo_score: "",

        presentation_score: "",

        defense_score: "",

        comment: ""

    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const result =
                await createEvaluation(form);

            alert(
                `Chấm điểm thành công!\nĐiểm tổng: ${result.total_score}`
            );
            reload();

            setForm({

                topic_id: "",

                lecturer_id: "",

                report_score: "",

                demo_score: "",

                presentation_score: "",

                defense_score: "",

                comment: ""

            });

        }

        catch (err) {

            console.log(err);

            alert("Không thể chấm điểm");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="evaluation-container">

            <h2>

                Evaluation

            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="topic_id"
                    placeholder="Topic ID"
                    value={form.topic_id}
                    onChange={handleChange}
                />

                <input
                    name="lecturer_id"
                    placeholder="Lecturer ID"
                    value={form.lecturer_id}
                    onChange={handleChange}
                />

                <input
                    name="report_score"
                    placeholder="Report Score"
                    value={form.report_score}
                    onChange={handleChange}
                />

                <input
                    name="demo_score"
                    placeholder="Demo Score"
                    value={form.demo_score}
                    onChange={handleChange}
                />

                <input
                    name="presentation_score"
                    placeholder="Presentation Score"
                    value={form.presentation_score}
                    onChange={handleChange}
                />

                <input
                    name="defense_score"
                    placeholder="Defense Score"
                    value={form.defense_score}
                    onChange={handleChange}
                />

                <textarea
                    name="comment"
                    placeholder="Comment..."
                    value={form.comment}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-primary"
                    disabled={loading}
                >

                    {

                        loading

                            ? "Saving..."

                            : "Save Evaluation"

                    }

                </button>

            </form>

        </div>

    );

}

export default EvaluationForm;