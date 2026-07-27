import { useEffect, useState } from "react";

import ProgressForm from "../components/progress/ProgressForm";
import ProgressList from "../components/progress/ProgressList";
import LecturerCommentModal from "../components/progress/LecturerCommentModal";

import {
    getProgress,
    createProgress,
    deleteProgress,
    updateComment
} from "../services/progressService";

import "../assets/styles/ProgressPage.css";

function ProgressPage() {

    const [topicId, setTopicId] = useState("");

    const [progress, setProgress] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedProgress, setSelectedProgress] = useState(null);

    async function loadProgress(id = topicId) {

        if (!id) {

            setProgress([]);

            return;

        }

        try {

            setLoading(true);

            const data = await getProgress(id);

            setProgress(data);

        } catch (err) {

            console.log(err);

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

    async function handleCreate(topic, description) {

        try {

            await createProgress(topic, description);

            alert("Thêm tiến độ thành công");

            setTopicId(topic);

            loadProgress(topic);

        } catch (err) {

            console.log(err);

            alert("Không thể thêm tiến độ");

        }

    }

    async function handleDelete(id) {

        const ok = window.confirm("Bạn có chắc muốn xóa?");

        if (!ok) return;

        try {

            await deleteProgress(id);

            alert("Xóa thành công");

            loadProgress();

        } catch (err) {

            console.log(err);

            alert("Xóa thất bại");

        }

    }

    async function handleSaveComment(id, comment) {

        try {

            await updateComment(id, comment);

            alert("Đã lưu nhận xét");

            setSelectedProgress(null);

            loadProgress();

        } catch (err) {

            console.log(err);

            alert("Không lưu được nhận xét");

        }

    }

    return (

        <div className="progress-page">

            <ProgressForm
                onCreate={handleCreate}
            />

            <div className="progress-toolbar">

                <input
                    type="number"
                    placeholder="Nhập Topic ID để xem tiến độ"
                    value={topicId}
                    onChange={(e) =>
                        setTopicId(e.target.value)
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={() => loadProgress()}
                >
                    Refresh
                </button>

            </div>

            <ProgressList
                progress={progress}
                loading={loading}
                onDelete={handleDelete}
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

export default ProgressPage;