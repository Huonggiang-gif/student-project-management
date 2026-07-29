const evaluationModel = require("../../models/evaluation.model")
const reportModel = require("../../models/report.model")

// Lấy danh sách đánh giá theo đề tài
async function getEvaluations(req, res) {
    const { topic_id } = req.params
    try {
        const evaluations = await evaluationModel.findEvaluationsByTopic(topic_id)
        res.json(evaluations)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách đánh giá"
        })
    }
}

// Lấy chi tiết đánh giá
async function getEvaluationById(req, res) {
    const { id } = req.params
    try {
        const evaluation = await evaluationModel.findEvaluationById(id)
        if (!evaluation) {
            return res.status(404).json({
                message: "Không tìm thấy đánh giá"
            })
        }
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy đánh giá"
        })
    }
}

// Thêm đánh giá mới
async function createEvaluation(req, res) {
    try {
        console.log("BODY:", req.body);
        const {
            topic_id,
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            comment
        } = req.body
        const lecturer_id = req.user.id
        // Kiểm tra dữ liệu
        if (
            !topic_id ||
            report_score == null ||
            demo_score == null ||
            presentation_score == null ||
            defense_score == null
        ) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin đánh giá"
            })
        }
        
        // Tính điểm tổng
        const total_score = Number(
            (
                (
                    Number(report_score) +
                    Number(demo_score) +
                    Number(presentation_score) +
                    Number(defense_score)
                ) / 4
            ).toFixed(2)
        )
        const result = await evaluationModel.createEvaluation(
            topic_id,
            lecturer_id,
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            total_score,
            comment
        )
        // Cập nhật trạng thái báo cáo sau khi đánh giá
        const report = await reportModel.findReportByTopicId(topic_id)
        if (report) {
            const resultUpdate = await reportModel.updateReportStatus(
                report.id,
                "reviewed"
            )
        }
        res.status(201).json({
            message: "Chấm điểm thành công",
            evaluation_id: result.insertId,
            total_score
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi chấm điểm"
        })
    }
}
// Cập nhật đánh giá
async function updateEvaluation(req, res) {
    const { id } = req.params
    try {
        const {
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            comment
        } = req.body
        // Kiểm tra tồn tại
        const evaluation = await evaluationModel.findEvaluationById(id)
        if (!evaluation) {
            return res.status(404).json({
                message: "Không tìm thấy đánh giá"
            })
        }
        // Kiểm tra dữ liệu
        if (
            report_score == null ||
            demo_score == null ||
            presentation_score == null ||
            defense_score == null
        ) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ điểm"
            })
        }
        // Tính điểm tổng
        const total_score = Number(
            (
                (
                    Number(report_score) +
                    Number(demo_score) +
                    Number(presentation_score) +
                    Number(defense_score)
                ) / 4
            ).toFixed(2)
        )
        await evaluationModel.updateEvaluation(
            id,
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            total_score,
            comment
        )
        res.json({
            message: "Cập nhật điểm thành công",
            total_score
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật đánh giá"
        })
    }
}
// Xóa đánh giá
async function deleteEvaluation(req, res) {
    const { id } = req.params
    try {
        const evaluation = await evaluationModel.findEvaluationById(id)
        if (!evaluation) {
            return res.status(404).json({
                message: "Không tìm thấy đánh giá"
            })
        }
        await evaluationModel.deleteEvaluation(id)
        res.json({
            message: "Xóa đánh giá thành công"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi xóa đánh giá"
        })
    }
}

module.exports = {
    getEvaluations,
    getEvaluationById,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
}