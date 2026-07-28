import { useState } from "react";
import { createEvaluation } from "../../services/evaluationService";
import "../../assets/styles/ReviewForm.css"

function ReviewForm({ topic_id, onClose, onSuccess }) {

    const [formData, setFormData] = useState({
        report_score: "",
        demo_score: "",
        presentation_score: "",
        defense_score: "",
        comment: ""
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }
    async function handleSubmit(e) {

        e.preventDefault();
            const data = {
            topic_id,
            ...formData
        };

        console.log("DATA:", data);
        try {

            await createEvaluation({

                topic_id: topic_id,

                ...formData

            });

            alert("Đánh giá thành công");

            onSuccess();

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="review-modal">

            <div className="review-content">

                <h2>Đánh giá đồ án</h2>

                <form onSubmit={handleSubmit}>

                    <div className="review-grid">

                        <input
                            type="number"
                            name="report_score"
                            placeholder="Điểm báo cáo"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="demo_score"
                            placeholder="Điểm demo"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="presentation_score"
                            placeholder="Điểm thuyết trình"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="defense_score"
                            placeholder="Điểm bảo vệ"
                            onChange={handleChange}
                        />

                    </div>

                    <textarea
                        name="comment"
                        placeholder="Nhận xét"
                        onChange={handleChange}
                    />

                    <div className="review-actions">

                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className="btn-save"
                        >
                            Lưu đánh giá
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ReviewForm;