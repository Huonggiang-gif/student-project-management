const db = require("../config/db")

// Lấy danh sách đánh giá theo đề tài
async function findEvaluationsByTopic(topic_id) {
    const [evaluations] = await db.query(
        `SELECT *
        FROM evaluations
        WHERE topic_id = ?
        ORDER BY evaluated_at DESC`,
        [topic_id]
    )
    return evaluations
}

// Lấy một đánh giá theo ID
async function findEvaluationById(id) {
    const [evaluations] = await db.query(
        `SELECT *
        FROM evaluations
        WHERE id = ?`,
        [id]
    )
    return evaluations[0] || null
}

// Thêm đánh giá mới
async function createEvaluation(
    topic_id,
    lecturer_id,
    report_score,
    demo_score,
    presentation_score,
    defense_score,
    total_score,
    comment
) {
    const [result] = await db.query(
        `INSERT INTO evaluations
        (
            topic_id,
            lecturer_id,
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            total_score,
            comment
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            topic_id,
            lecturer_id,
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            total_score,
            comment
        ]
    )
    return result
}

// Cập nhật đánh giá
async function updateEvaluation(
    id,
    report_score,
    demo_score,
    presentation_score,
    defense_score,
    total_score,
    comment
) {
    const [result] = await db.query(
        `UPDATE evaluations
        SET
            report_score = ?,
            demo_score = ?,
            presentation_score = ?,
            defense_score = ?,
            total_score = ?,
            comment = ?
        WHERE id = ?`,
        [
            report_score,
            demo_score,
            presentation_score,
            defense_score,
            total_score,
            comment,
            id
        ]
    )
    return result

}

// Xóa đánh giá
async function deleteEvaluation(id) {
    const [result] = await db.query(
        `DELETE FROM evaluations
        WHERE id = ?`,
        [id]
    )
    return result
}

module.exports = {
    findEvaluationsByTopic,
    findEvaluationById,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
}