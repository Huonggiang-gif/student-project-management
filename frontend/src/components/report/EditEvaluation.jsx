import { useState } from "react";
import { updateEvaluation } from "../../services/evaluationService";
import "../../assets/styles/ReviewForm.css";

function EditEvaluation({ evaluation, onSuccess, onClose }) {
    const [formData, setFormData] = useState({
        report_score: evaluation.report_score || "",
        demo_score: evaluation.demo_score || "",
        presentation_score: evaluation.presentation_score || "",
        defense_score: evaluation.defense_score || "",
        comment: evaluation.comment || ""
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateEvaluation(evaluation.id, formData);
            onSuccess();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="review-form">
            <div className="review-content">
                <h2>Cập nhật đánh giá</h2>

                <form onSubmit={handleSubmit}>
                    {/* Lưới 2 cột cho các ô nhập điểm */}
                    <div className="review-grid">
                        <div className="form-group">
                            <label>Điểm báo cáo</label>
                            <input
                                type="number"
                                name="report_score"
                                value={formData.report_score}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Điểm demo</label>
                            <input
                                type="number"
                                name="demo_score"
                                value={formData.demo_score}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Điểm thuyết trình</label>
                            <input
                                type="number"
                                name="presentation_score"
                                value={formData.presentation_score}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Điểm bảo vệ</label>
                            <input
                                type="number"
                                name="defense_score"
                                value={formData.defense_score}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Ô Nhận xét nằm riêng bên dưới */}
                    <div className="form-group">
                        <label>Nhận xét</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="review-actions">
                        <button type="submit" className="btn-save">
                            Lưu thay đổi
                        </button>
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEvaluation;