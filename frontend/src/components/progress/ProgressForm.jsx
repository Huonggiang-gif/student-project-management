import { useState } from "react";
import "../../assets/styles/ProgressForm.css";

function ProgressForm({ onCreate }) {

    const [topicId, setTopicId] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!topicId) {
            alert("Vui lòng nhập Topic ID");
            return;
        }

        if (!description.trim()) {
            alert("Vui lòng nhập tiến độ");
            return;
        }

        await onCreate(topicId, description);

        setDescription("");
    }

    return (

        <form
            className="progress-form"
            onSubmit={handleSubmit}
        >

            <h2>Cập nhật tiến độ</h2>

            <div className="form-group">

                <label>Topic ID</label>

                <input
                    type="number"
                    value={topicId}
                    onChange={(e) =>
                        setTopicId(e.target.value)
                    }
                    placeholder="Nhập Topic ID"
                />

            </div>

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