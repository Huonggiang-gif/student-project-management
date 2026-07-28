const db = require("../config/db");

// =========================
// Lấy tất cả tiến độ
// =========================
async function findAllProgress() {
    const [rows] = await db.query(`
        SELECT
            t.id AS topic_id,
            t.title,
            t.status,
            s.full_name AS student_name,
            l.full_name AS lecturer_name,
            p.id,
            p.description,
            p.lecturer_comment,
            p.updated_at
        FROM topics t
        LEFT JOIN (
            SELECT p1.*
            FROM progress_reports p1
            INNER JOIN (
                SELECT
                    topic_id,
                    MAX(updated_at) AS latest_time
                FROM progress_reports
                GROUP BY topic_id
            ) p2
            ON p1.topic_id = p2.topic_id
            AND p1.updated_at = p2.latest_time
        ) p
        ON t.id = p.topic_id
        LEFT JOIN users s
            ON t.student_id = s.id
        LEFT JOIN users l
            ON t.lecturer_id = l.id
        WHERE t.status IN ('approved','in_progress','completed')
        ORDER BY
        CASE
            WHEN t.status = 'completed' THEN 1
            ELSE 0
        END,
        p.updated_at DESC

    `);

    return rows;
}
// =========================
// Lấy tiến độ theo Topic
// =========================
async function findProgressByTopic(topicId) {
    const [rows] = await db.query(
        `SELECT
            p.id,
            p.topic_id,
            p.week,
            p.description,
            p.percentage,
            p.lecturer_comment,
            p.updated_at,
            t.title,
            s.full_name AS student_name,
            l.full_name AS lecturer_name,
            r.status AS report_status

        FROM progress_reports p
        INNER JOIN topics t
            ON p.topic_id = t.id
        INNER JOIN users s
            ON t.student_id = s.id
        INNER JOIN users l
            ON t.lecturer_id = l.id
        LEFT JOIN reports r
            ON p.topic_id = r.topic_id
        WHERE p.topic_id = ?
        AND
            t.status IN ('approved','in_progress','completed')
        ORDER BY p.updated_at DESC`,
        [topicId]
    );
    return rows;
}

// =========================
// Lấy tiến độ theo ID
// =========================
async function findProgressById(id) {

    const [rows] = await db.query(

        `SELECT
            p.id,
            p.topic_id,
            p.description,
            p.lecturer_comment,
            p.updated_at,
            t.title,
            s.full_name AS student_name,
            l.full_name AS lecturer_name
        FROM progress_reports p
        INNER JOIN topics t
            ON p.topic_id = t.id
        INNER JOIN users s
            ON t.student_id = s.id
        INNER JOIN users l
            ON t.lecturer_id = l.id
        WHERE p.id = ?`,
        [id]
    );
    return rows[0] || null;
}

// =========================
// Thêm tiến độ
// =========================
async function createProgress(topic_id, description, percentage, week) {
    const [result] = await db.query(
        `INSERT INTO progress_reports
        (topic_id, description, percentage, week)
        VALUES (?, ?, ?, ?)`,
        [topic_id, description, percentage, week]
    );
    return result;
}

// =========================
// Giảng viên nhận xét
// =========================
async function updateLecturerComment(id, lecturer_comment) {
    const [result] = await db.query(
        `UPDATE progress_reports
         SET lecturer_comment = ?
         WHERE id = ?`,
        [lecturer_comment, id]
    );
    return result;
}

// =========================
// Xóa tiến độ
// =========================
async function deleteProgress(id) {
    const [result] = await db.query(
        `DELETE FROM progress_reports
         WHERE id = ?`,
        [id]
    );
    return result;
}
module.exports = {
    findAllProgress,
    findProgressByTopic,
    findProgressById,
    createProgress,
    updateLecturerComment,
    deleteProgress
};