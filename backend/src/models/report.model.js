const db = require("../config/db")

// Lấy tất cả báo cáo theo đề tài
async function findReportsByTopic(topic_id) {
    const [reports] = await db.query(
        `SELECT * FROM reports
        WHERE topic_id = ?
        ORDER BY submitted_at DESC`,
        [topic_id]
    )
    return reports
}

// Lấy một báo cáo theo ID
async function findReportById(id) {
    const [reports] = await db.query(
        "SELECT * FROM reports WHERE id = ?",
        [id]
    )
    return reports[0] || null
}

// Thêm báo cáo mới
async function createReport(
    topic_id,
    file_name,
    file_url,
    file_size
) {
    const [result] = await db.query(
        `INSERT INTO reports
        (topic_id, file_name, file_url, file_size)
        VALUES (?, ?, ?, ?)`,
        [
            topic_id,
            file_name,
            file_url,
            file_size
        ]
    )
    return result
}

// Cập nhật thông tin file báo cáo
async function updateReport(
    id,
    file_name,
    file_url,
    file_size,
    status
) {
    const [result] = await db.query(
        `UPDATE reports
        SET
            file_name = ?,
            file_url = ?,
            file_size = ?,
            status = ?
        WHERE id = ?`,
        [
            file_name,
            file_url,
            file_size,
            status,
            id
        ]
    )
    return result
}

// Chỉ cập nhật trạng thái báo cáo (chức năng của giảng viên)
async function updateReportStatus(
    id,
    status
) {
    const [result] = await db.query(
        `UPDATE reports
        SET status = ?
        WHERE id = ?`,
        [
            status,
            id
        ]
    )
    return result
}

// Xóa báo cáo
async function deleteReport(id) {
    const [result] = await db.query(
        "DELETE FROM reports WHERE id = ?",
        [id]
    )
    return result
}

module.exports = {
    findReportsByTopic,
    findReportById,
    createReport,
    updateReport,
    updateReportStatus,
    deleteReport
}