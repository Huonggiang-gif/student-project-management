const mysql = require("mysql2/promise")
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Hinhnhi129206",
    database: "studentprojectdb"
})
module.exports = db;