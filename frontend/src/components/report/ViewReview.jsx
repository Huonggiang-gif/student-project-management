import { useEffect, useState } from "react";
import { getEvaluation, deleteEvaluation } from "../../services/evaluationService";
import EditEvaluation from "./EditEvaluation";
import "../../assets/styles/ReviewForm.css";
function ViewReview({evaluation,onEdit, onClose, reload, readOnly = false }) {


    if (!evaluation) {

        return null;

    }
     async function handleDelete(){

        const confirmDelete =
            window.confirm(
                "Bạn có chắc muốn xóa đánh giá?"
            );


        if(!confirmDelete)
            return;


        try{

            await deleteEvaluation(
                evaluation.id
            );


            reload();

            onClose();


        }catch(error){

            console.log(error);

        }

    }
    return (
        <div className="review-modal">
            <div className="review-content">
                <h2>Chi tiết đánh giá</h2>
                <p><strong>Điểm báo cáo:</strong> {evaluation.report_score}</p>
                <p><strong>Điểm demo:</strong> {evaluation.demo_score}</p>
                <p><strong>Điểm thuyết trình:</strong> {evaluation.presentation_score}</p>
                <p><strong>Điểm bảo vệ:</strong> {evaluation.defense_score}</p>
                <p><strong>Tổng điểm:</strong> {evaluation.total_score}</p>
                <p><strong>Nhận xét:</strong></p>
                <p>{evaluation.comment}</p>
                <div className="review-actions">
                    {!readOnly && (
                        <>
                            <button
                                className="btn-edit"
                                onClick={() => onEdit(evaluation)}
                            >
                                Cập nhật
                            </button>

                            <button
                                className="btn-delete"
                                onClick={handleDelete}
                            >
                                Xóa
                            </button>
                        </>
                    )}

                    <button
                        className="btn-save"
                        onClick={onClose}
                    >
                        Đóng
                    </button>

                </div>
            </div>
        </div>

    );

}

export default ViewReview;