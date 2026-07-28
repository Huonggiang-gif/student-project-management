const db = require("../config/db");

const Topic = {
    // ==========================
    // Lấy tất cả đề tài (Admin)
    // ==========================
    async getAll() {
        const [rows] = await db.query(`
            SELECT
                t.id,
                t.title,
                t.description,
                t.student_id,
                t.lecturer_id,
                t.status,
                t.created_at,
                s.full_name AS student_name,
                s.user_code AS student_code,
                l.full_name AS lecturer_name,
                l.user_code AS lecturer_code
            FROM topics t
            LEFT JOIN users s
            ON t.student_id = s.id
            LEFT JOIN users l
            ON t.lecturer_id = l.id
            ORDER BY t.created_at DESC
        `);
        return rows;
    },

    // ==========================
    // Danh sách đề tài chưa có người đăng ký
    // ==========================
    async getAvailableTopics() {
        const [rows] = await db.query(`
        SELECT
            id,
            title,
            description
        FROM topics 
        WHERE student_id IS NULL
        AND status='pending'
        ORDER BY created_at DESC
    `);
        return rows;
    },

    // ==========================
    // Đề tài của sinh viên
    // ==========================
    async getByStudentId(studentId) {
        const [rows] = await db.query(`
            SELECT
                t.*,
                u.full_name AS lecturer_name
            FROM topics t
            LEFT JOIN users u
                ON t.lecturer_id = u.id
            WHERE t.student_id = ?
            ORDER BY t.created_at DESC
        `, [studentId]);
        return rows;
    },

    // ==========================
    // Đề tài của giảng viên
    // ==========================
    async getByLecturerId(lecturerId) {
        const [rows] = await db.query(`
            SELECT
                t.*,
                u.full_name AS student_name
            FROM topics t
            JOIN users u
                ON t.student_id = u.id
            WHERE t.lecturer_id = ?
            ORDER BY t.created_at DESC
        `, [lecturerId]);
        return rows;
    },

    // ==========================
    // Chi tiết đề tài
    // ==========================
    async getById(id) {
        const [rows] = await db.query(`
            SELECT
                t.*,
                s.full_name AS student_name,
                s.user_code AS student_code,
                l.full_name AS lecturer_name,
                l.user_code AS lecturer_code
            FROM topics t
            LEFT JOIN users s
                ON t.student_id = s.id
            LEFT JOIN users l
                ON t.lecturer_id = l.id
            WHERE t.id = ?
        `, [id]);
        return rows[0];
    },

    // ==========================
    // Admin tạo đề tài
    // ==========================
    async createTopic(data) {
        const sql = `
        INSERT INTO topics
        (
            title,
            description,
            status
        )
        VALUES(?,?,?)
    `;
        const [result] = await db.query(
            sql,
            data
        );
        return result;
    },

    // ==========================
    // Cập nhật đề tài
    // ==========================
    async update(id, data) {
        const sql = `
            UPDATE topics
            SET
                title = ?,
                description = ?,
                lecturer_id = ?,
                status = ?
            WHERE id = ?
        `;
        const [result] = await db.query(
            sql,
            [...data, id]
        );
        return result;
    },

    // ==========================
    // Xóa đề tài
    // ==========================
    async delete(id) {
        const [result] = await db.query(
            "DELETE FROM topics WHERE id = ?",
            [id]
        );
        return result;
    },

    // ==========================
    // Cập nhật trạng thái
    // ==========================
    async updateStatus(id, status) {
        const [result] = await db.query(
            `
            UPDATE topics
            SET status = ?
            WHERE id = ?
            `,
            [status, id]
        );
        return result;
    },

    // ==========================
    // Đánh giá đề tài
    // ==========================
    async reviewTopic(id, score, review) {
        const [result] = await db.query(
            `
        UPDATE topics
        SET
            score=?,
            review=?,
            reviewed_at=NOW()
        WHERE id=?
        `,
            [
                score,
                review,
                id
            ]
        );
        return result;
    },

    async getStudentsOfLecturer(lecturerId) {
        const [rows] = await db.query(`
        SELECT
            u.id,
            u.user_code,
            u.full_name,
            u.email,
            t.id AS topic_id,
            t.title,
            t.status
        FROM topics t
        JOIN users u
            ON t.student_id = u.id
        WHERE
            t.lecturer_id = ?
        AND
            t.status IN (
                'approved',
                'in_progress',
                'completed'
            )
        ORDER BY u.full_name
    `, [lecturerId]);
        return rows;
    },

    // ==========================
    // Kiểm tra sinh viên đã có đề tài
    // ==========================
    async checkStudentHasTopic(studentId) {
        const [rows] = await db.query(
            `
        SELECT *
        FROM topics
        WHERE student_id=?
        AND status IN
        (
        'pending',
        'approved',
        'in_progress'
        )
        `,
            [studentId]
        );
        return rows[0];
    },

    // ==========================
    // Sinh viên đăng ký đề tài
    // ==========================
    async registerTopic(
        topicId,
        studentId,
        lecturerId
    ) {
        const [result] = await db.query(
            `
        UPDATE topics
        SET
            student_id = ?,
            lecturer_id = ?,
            status = 'pending'
        WHERE id = ?
        `,
            [
                studentId,
                lecturerId,
                topicId
            ]
        );
        return result;
    },
};

module.exports = Topic;