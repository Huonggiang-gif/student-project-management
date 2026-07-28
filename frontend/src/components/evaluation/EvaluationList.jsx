import { useState } from "react";
import {
    updateEvaluation,
    deleteEvaluation
} from "../../services/evaluationService";

import "../../assets/styles/EvaluationList.css";

function EvaluationList({
    evaluations,
    loading,
    reload
}) {

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({});

    function startEdit(item) {

        setEditingId(item.id);

        setForm({
            report_score: item.report_score,
            demo_score: item.demo_score,
            presentation_score: item.presentation_score,
            defense_score: item.defense_score,
            comment: item.comment || ""
        });

    }

    async function save(id) {

        try {

            await updateEvaluation(id, form);

            alert("Cập nhật thành công");

            setEditingId(null);

            reload();

        }

        catch (err) {

            console.log(err);

            alert("Lỗi cập nhật");

        }

    }

    async function remove(id) {

        if (!window.confirm("Xóa đánh giá?")) return;

        try {

            await deleteEvaluation(id);

            alert("Đã xóa");

            reload();

        }

        catch (err) {

            console.log(err);

            alert("Không thể xóa");

        }

    }

    if (loading)

        return <p>Đang tải...</p>;

    if (evaluations.length === 0)

        return <p>Chưa có đánh giá.</p>;

    return (

        <table className="evaluation-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Report</th>

                    <th>Demo</th>

                    <th>Presentation</th>

                    <th>Defense</th>

                    <th>Total</th>

                    <th>Comment</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    evaluations.map(item => (

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            {

                                editingId === item.id ?

                                <>

                                    <td>

                                        <input
                                            value={form.report_score}
                                            onChange={(e)=>setForm({
                                                ...form,
                                                report_score:e.target.value
                                            })}
                                        />

                                    </td>

                                    <td>

                                        <input
                                            value={form.demo_score}
                                            onChange={(e)=>setForm({
                                                ...form,
                                                demo_score:e.target.value
                                            })}
                                        />

                                    </td>

                                    <td>

                                        <input
                                            value={form.presentation_score}
                                            onChange={(e)=>setForm({
                                                ...form,
                                                presentation_score:e.target.value
                                            })}
                                        />

                                    </td>

                                    <td>

                                        <input
                                            value={form.defense_score}
                                            onChange={(e)=>setForm({
                                                ...form,
                                                defense_score:e.target.value
                                            })}
                                        />

                                    </td>

                                    <td>-</td>

                                    <td>

                                        <input
                                            value={form.comment}
                                            onChange={(e)=>setForm({
                                                ...form,
                                                comment:e.target.value
                                            })}
                                        />

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-success"
                                            onClick={()=>save(item.id)}
                                        >
                                            Save
                                        </button>

                                    </td>

                                </>

                                :

                                <>

                                    <td>{item.report_score}</td>

                                    <td>{item.demo_score}</td>

                                    <td>{item.presentation_score}</td>

                                    <td>{item.defense_score}</td>

                                    <td>{item.total_score}</td>

                                    <td>{item.comment}</td>

                                    <td>

                                        <button
                                            className="btn btn-primary"
                                            onClick={()=>startEdit(item)}
                                        >
                                            Edit
                                        </button>

                                        {" "}

                                        <button
                                            className="btn btn-danger"
                                            onClick={()=>remove(item.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </>

                            }

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}

export default EvaluationList;