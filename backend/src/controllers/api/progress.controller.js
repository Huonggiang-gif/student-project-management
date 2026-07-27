const progressModel = require("../../models/progress.model")

// Lấy danh sách tiến độ theo đề tài
async function getProgress(req, res) {
    const { topicId } = req.params
    try {
        const progress = await progressModel.findProgressByTopic(topicId)
        res.json(progress)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách tiến độ"
        })
    }
}

// Lấy một tiến độ theo ID
async function getProgressById(req, res) {
    const { id } = req.params
    try {
        const progress = await progressModel.findProgressById(id)
        if (!progress) {
            return res.status(404).json({
                message: "Không tìm thấy tiến độ"
            })
        }
        res.json(progress)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy tiến độ"
        })
    }
}

// Thêm tiến độ mới
async function createProgress(req, res) {
    try {
        const {
            topic_id,
            description
        } = req.body
        // Kiểm tra dữ liệu
        if (
            !topic_id ||
            !description
        ) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin tiến độ"
            })
        }
        const result = await progressModel.createProgress(
            topic_id,
            description
        )
        res.status(201).json({
            message: "Cập nhật tiến độ thành công",
            progress_id: result.insertId
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật tiến độ"
        })
    }
}

// Giảng viên nhận xét tiến độ
async function updateComment(req, res) {
    const { id } = req.params
    const { lecturer_comment } = req.body
    try {
        // Kiểm tra dữ liệu
        if (!lecturer_comment) {
            return res.status(400).json({
                message: "Vui lòng nhập nhận xét"
            })
        }
        // Kiểm tra tiến độ tồn tại
        const progress = await progressModel.findProgressById(id)
        if (!progress) {
            return res.status(404).json({
                message: "Không tìm thấy tiến độ"
            })
        }
        await progressModel.updateLecturerComment(
            id,
            lecturer_comment
        )
        res.json({
            message: "Nhận xét tiến độ thành công"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi nhận xét tiến độ"
        })
    }
}

// Xóa tiến độ
async function deleteProgress(req, res) {
    const { id } = req.params
    try {
        // Kiểm tra tiến độ tồn tại
        const progress = await progressModel.findProgressById(id)
        if (!progress) {
            return res.status(404).json({
                message: "Không tìm thấy tiến độ"
            })
        }
        await progressModel.deleteProgress(id)
        res.json({
            message: "Xóa tiến độ thành công"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi xóa tiến độ"
        })
    }
}

module.exports = {
    getProgress,
    getProgressById,
    createProgress,
    updateComment,
    deleteProgress
}