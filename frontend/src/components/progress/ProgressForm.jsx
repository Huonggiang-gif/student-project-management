import { useState } from "react";
import "../../assets/styles/ProgressForm.css";

function ProgressForm({ topicId, onCreate, onComplete }) {

    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    async function handleSubmit(e) {

        e.preventDefault();

        if (!description.trim()) {

            alert("Vui lòng nhập nội dung tiến độ");

            return;

        }

        try {

            await onCreate(topicId, description);

            if (completed) {

                await onComplete(topicId);

            }

            setDescription("");

            setCompleted(false);

        } catch (error) {

            console.log(error);

            alert("Cập nhật tiến độ thất bại");

        }

    }

    return (

        <form
            className="progress-form"
            onSubmit={handleSubmit}
        >
            <h2>Cập nhật tiến độ</h2>
            <div className="form-group">

                <label>Mô tả tiến độ</label>

                <textarea
                    rows="5"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    placeholder="Ví dụ: Hoàn thành giao diện Dashboard..."
                />

            </div>
            <div className="form-check mt-3">

                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />

                <label>

                    Tôi đã hoàn thành đề tài

                </label>

            </div>
            <button
                className="btn btn-primary"
                type="submit"
            >
                Lưu tiến độ
            </button>

        </form>

    );

}

export default ProgressForm;