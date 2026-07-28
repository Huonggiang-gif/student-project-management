import { useState } from "react";

import "../../assets/styles/LecturerCommentModal.css";

function LecturerCommentModal({

    progress,

    onSave,

    onClose

}) {

    const [comment, setComment] = useState(

        progress?.lecturer_comment || ""

    );

    if (!progress) return null;

    async function handleSave() {

        if (!comment.trim()) {

            alert("Vui lòng nhập nhận xét");

            return;

        }

        await onSave(

            progress.id,

            comment

        );

    }

    return (

        <div className="modal-overlay">

            <div className="comment-modal">

                <h2>

                    Nhận xét tiến độ

                </h2>

                <textarea

                    rows="6"

                    value={comment}

                    onChange={(e) =>
                        setComment(e.target.value)
                    }

                />

                <div className="modal-buttons">

                    <button

                        className="btn btn-success"

                        onClick={handleSave}

                    >

                        Lưu

                    </button>

                    <button

                        className="btn btn-danger"

                        onClick={onClose}

                    >

                        Đóng

                    </button>

                </div>

            </div>

        </div>

    );

}

export default LecturerCommentModal;