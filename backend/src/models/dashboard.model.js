const db = require("../config/db");

exports.getStats = async () => {

    const [[users]] = await db.query(
        "SELECT COUNT(*) AS total FROM users"
    );

    const [[students]] = await db.query(
        "SELECT COUNT(*) AS total FROM users WHERE role='student'"
    );

    const [[lecturers]] = await db.query(
        "SELECT COUNT(*) AS total FROM users WHERE role='lecturer'"
    );

    const [[topics]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics"
    );

    const [[pending]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics WHERE status='pending'"
    );

    const [[waiting]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics WHERE status='waiting_approval'"
    );

    const [[approved]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics WHERE status='approved'"
    );

    const [[inProgress]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics WHERE status='in_progress'"
    );

    const [[completed]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics WHERE status='completed'"
    );

    return {
        totalUsers: users.total,
        totalStudents: students.total,
        totalLecturers: lecturers.total,
        totalTopics: topics.total,

        pending: pending.total,
        waitingApproval: waiting.total,
        approved: approved.total,
        inProgress: inProgress.total,
        completed: completed.total
    };
};

exports.getLecturerStats = async (lecturerId) => {

    const [[topics]] = await db.query(
        "SELECT COUNT(*) AS total FROM topics WHERE lecturer_id = ?",
        [lecturerId]
    );

    const [[students]] = await db.query(
        `SELECT COUNT(DISTINCT student_id) AS total
         FROM topics
         WHERE lecturer_id = ?`,
        [lecturerId]
    );

    const [[progress]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM progress_reports p
         JOIN topics t ON p.topic_id = t.id
         WHERE t.lecturer_id = ?`,
        [lecturerId]
    );

    return {
        totalTopics: topics.total,
        totalStudents: students.total,
        totalProgress: progress.total
    };
};

exports.getStudentStats = async (studentId) => {

    const [[topic]] = await db.query(
        `SELECT
            t.title,
            u.full_name AS lecturer
         FROM topics t
         LEFT JOIN users u
            ON u.id = t.lecturer_id
         WHERE t.student_id = ?
         LIMIT 1`,
        [studentId]
    );

    const [[progress]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM progress_reports p
         JOIN topics t
            ON p.topic_id = t.id
         WHERE t.student_id = ?`,
        [studentId]
    );

    return {
        topic: topic?.title || "--",
        lecturer: topic?.lecturer || "--",
        progress: progress.total
    };
};