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
    const sql = `
        SELECT
            r.id,
            r.topic_id,
            r.file_name,
            r.file_url,
            r.file_size,
            r.submitted_at,
            r.status,

            t.title AS topic_title,

            s.full_name AS student_name,
            s.user_code,

            l.full_name AS lecturer_name,

            e.report_score,
            e.demo_score,
            e.presentation_score,
            e.defense_score,
            e.total_score,
            e.comment

        FROM reports r

        INNER JOIN topics t
            ON r.topic_id = t.id

        INNER JOIN users s
            ON t.student_id = s.id

        LEFT JOIN users l
            ON t.lecturer_id = l.id

        LEFT JOIN evaluations e
            ON e.topic_id = t.id

        WHERE r.id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0] || null;
}
//Lấy tất cả báo cáo
async function getAllReports() {

    const sql = `
        SELECT
            r.id,
            r.topic_id,
            r.file_name,
            r.file_url,
            r.file_size,
            r.submitted_at,
            r.status,

            t.title AS topic_title,

            s.id AS student_id,
            s.user_code,
            s.full_name AS student_name,

            l.id AS lecturer_id,
            l.full_name AS lecturer_name
        FROM reports r
        INNER JOIN topics t
            ON r.topic_id = t.id
        INNER JOIN users s
            ON t.student_id = s.id
        LEFT JOIN users l
            ON t.lecturer_id = l.id
        ORDER BY r.submitted_at DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
}
// Lấy tất cả báo cáo của sinh viên thuộc giảng viên
async function findReportsByLecturer(lecturer_id) {

    const [reports] = await db.query(
        `
        SELECT 
            reports.id,
            reports.topic_id,
            reports.file_name,
            reports.file_url,
            reports.file_size,
            reports.status,
            reports.submitted_at,
            topics.title AS topic,
            users.full_name AS student
        FROM reports
        JOIN topics
            ON reports.topic_id = topics.id
        JOIN users
            ON topics.student_id = users.id
        WHERE topics.lecturer_id = ?
        ORDER BY reports.submitted_at DESC
        `,
        [lecturer_id]
    )

    return reports
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
// Lấy report theo topic_id
async function findReportByTopicId(topic_id) {

    const [rows] = await db.query(
        `
        SELECT id
        FROM reports
        WHERE topic_id = ?
        `,
        [topic_id]
    )

    return rows[0] || null
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
    findReportByTopicId,
    findReportById,
    findReportsByLecturer,
    getAllReports,
    createReport,
    updateReport,
    updateReportStatus,
    deleteReport
}