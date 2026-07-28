const progressModel = require("../../models/progress.model");
const topicModel = require("../../models/topic.model");
// =========================
// Lấy tất cả tiến độ
// =========================
async function getAllProgress(req, res) {
    try {
        const progress = await progressModel.findAllProgress();
        return res.status(200).json(progress);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách tiến độ"
        });
    }
}
// =========================
// Lấy theo Topic
// =========================
async function getProgress(req, res) {
    try {
        const { topicId } = req.params;
        const progress = await progressModel.findProgressByTopic(topicId);
        console.log(progress);
        return res.status(200).json(progress);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách tiến độ"
        });
    }
}
// =========================
// Lấy theo ID
// =========================
async function getProgressById(req, res) {
    try {
        const { id } = req.params;
        const progress = await progressModel.findProgressById(id);
        if (!progress) {
            return res.status(404).json({
                message: "Không tìm thấy tiến độ"
            });
        }
        return res.status(200).json(progress);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy tiến độ"
        });
    }
}
// =========================
// Sinh viên cập nhật tiến độ
// =========================
async function createProgress(req, res) {
    try {
        const { topic_id, description, percentage, week } = req.body;
        if (!topic_id || !description) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }
        const topic = await topicModel.findById(topic_id);
        console.log(topic);   // thêm dòng này
        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }
        if (topic.status === "completed") {
            return res.status(400).json({
                message: "Đề tài đã hoàn thành"
            });
        }
        const result = await progressModel.createProgress(
            topic_id,
            description,
            percentage,
            week
        );
        return res.status(201).json({
            message: "Cập nhật tiến độ thành công",
            progress_id: result.insertId
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật tiến độ"
        });
    }
}

// =========================
// Giảng viên nhận xét
// =========================
async function updateComment(req, res) {
    try {
        const { id } = req.params;
        const { lecturer_comment } = req.body;
        if (!lecturer_comment) {
            return res.status(400).json({
                message: "Vui lòng nhập nhận xét"
            });
        }
        const progress = await progressModel.findProgressById(id);
        if (!progress) {
            return res.status(404).json({
                message: "Không tìm thấy tiến độ"
            });
        }
        await progressModel.updateLecturerComment(
            id,
            lecturer_comment
        );
        return res.json({
            message: "Nhận xét thành công"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi nhận xét"
        });
    }
}
// =========================
// Admin xóa tiến độ
// =========================
async function deleteProgress(req, res) {
    try {
        const { id } = req.params;
        const progress = await progressModel.findProgressById(id);
        if (!progress) {
            return res.status(404).json({
                message: "Không tìm thấy tiến độ"
            });
        }
        await progressModel.deleteProgress(id);
        return res.json({
            message: "Xóa tiến độ thành công"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi xóa tiến độ"
        });
 }

}
module.exports = {
    getAllProgress,
    getProgress,
    getProgressById,
    createProgress,
    updateComment,
    deleteProgress
};