import { useEffect, useState } from "react";

import ProgressList from "../../../components/progress/ProgressList";
import LecturerCommentModal from "../../../components/progress/LecturerCommentModal";
import topicService from "../../../services/topicService";
import progressService from "../../../services/progressService";

import "../../../assets/styles/ProgressPage.css";
function LecturerProgress() {
    const [topicId, setTopicId] = useState("");
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProgress, setSelectedProgress] = useState(null);
    async function loadProgress(id = topicId) {
        if (!id) return;
        try {
            setLoading(true);
            const data = await progressService.getProgress(id);
            console.log("DATA:", data);
            setProgress(data);
        } catch (error) {
            console.log(error);
            alert("Không lấy được danh sách tiến độ");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (topicId) {
            loadProgress();
        }
    }, [topicId]);
    async function handleSaveComment(id, comment) {
        try {
            await progressService.updateComment(id, {
                lecturer_comment: comment
            });
            alert("Đã lưu nhận xét");
            setSelectedProgress(null);
            loadProgress();
        } catch (error) {
            console.log(error);
            alert("Không thể lưu nhận xét");
        }
    }
    async function handleComplete() {
    try {
        await topicService.updateStatus(
            topicId,
            "completed"
        );
        alert("Đã cập nhật trạng thái hoàn thành");
        loadProgress();
    } catch (error) {
        console.log(error);
        alert("Cập nhật thất bại");
    }
}
    return (
        <div className="progress-page">
            <h2>
                Quản lý tiến độ sinh viên
            </h2>
            <div className="progress-toolbar">
                <input
                    type="number"
                    placeholder="Nhập Topic ID"
                    value={topicId}
                    onChange={(e) =>
                        setTopicId(e.target.value)
                    }
                />
                <button
                    className="btn btn-success"
                    onClick={() => loadProgress()}
                >
                    Xem tiến độ
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleComplete}
                >
                    Hoàn thành đề tài
                </button>

            </div>
            <ProgressList
                progress={progress}
                loading={loading}
                role="lecturer"
                onComment={setSelectedProgress}
            />
            {
                selectedProgress &&
                <LecturerCommentModal
                    progress={selectedProgress}
                    onSave={handleSaveComment}
                    onClose={() =>
                        setSelectedProgress(null)
                    }
                />
            }
        </div>
    );
}
export default LecturerProgress;