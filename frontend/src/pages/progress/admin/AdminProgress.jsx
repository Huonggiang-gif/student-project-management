import { useEffect, useState } from "react";
import ProgressList from "../../../components/progress/ProgressList";
import progressService from "../../../services/progressService";
import "../../../assets/styles/ProgressPage.css";
function AdminProgress() {
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(false);
    async function loadProgress() {
        try {
            setLoading(true);
            const data = await progressService.getAllProgress();
            setProgress(data);
        } catch (error) {
            console.log(error);
            alert("Không lấy được danh sách tiến độ");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadProgress();
    }, []);
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa tiến độ này?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await progressService.deleteProgress(id);
            alert("Xóa tiến độ thành công");
            loadProgress();
        } catch (error) {
            console.log(error);
            alert("Xóa tiến độ thất bại");
        }
    }
    return (
        <div className="progress-page">
            <h2>
                Quản lý tiến độ
            </h2>
            <ProgressList
                progress={progress}
                loading={loading}
                role="admin"
                onDelete={handleDelete}
            />
        </div>
    );
}
export default AdminProgress;