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

    return {
        totalUsers: users.total,
        totalStudents: students.total,
        totalLecturers: lecturers.total,
        totalTopics: topics.total
    };
};