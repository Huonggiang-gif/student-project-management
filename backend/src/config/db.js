const mysql = require("mysql2/promise")
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Hgiang#123",
    database: "studentprojectdb"
})
module.exports = db;