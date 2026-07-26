const db = require("../config/db")

// Lấy danh sách tiến độ theo đề tài
async function findProgressByTopic(topic_id) {
    const [progress] = await db.query(
        `SELECT *
        FROM progress_reports
        WHERE topic_id = ?
        ORDER BY updated_at DESC`,
        [topic_id]
    )
    return progress

}

// Lấy một tiến độ theo ID
async function findProgressById(id) {
    const [progress] = await db.query(
        `SELECT *
        FROM progress_reports
        WHERE id = ?`,
        [id]
    )
    return progress[0] || null

}

// Thêm tiến độ mới
async function createProgress(
    topic_id,
    description
) {
    const [result] = await db.query(
        `INSERT INTO progress_reports
        (topic_id, description)
        VALUES (?, ?)`,
        [
            topic_id,
            description
        ]
    )
    return result

}

// Giảng viên nhận xét tiến độ
async function updateLecturerComment(
    id,
    lecturer_comment
) {
    const [result] = await db.query(
        `UPDATE progress_reports
        SET lecturer_comment = ?
        WHERE id = ?`,
        [
            lecturer_comment,
            id
        ]
    )
    return result
}

// Xóa tiến độ
async function deleteProgress(id) {
    const [result] = await db.query(
        `DELETE FROM progress_reports
        WHERE id = ?`,
        [id]
    )
    return result
}

module.exports = {
    findProgressByTopic,
    findProgressById,
    createProgress,
    updateLecturerComment,
    deleteProgress
}