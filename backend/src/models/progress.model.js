const db = require("../config/db");

const Progress = {

    async getAll() {

        const sql = `
        SELECT
            p.id,
            p.topic_id,
            p.description,
            p.lecturer_comment,
            p.updated_at,

            t.title AS topic_title

        FROM progress_reports p

        JOIN topics t
        ON p.topic_id=t.id

        ORDER BY p.updated_at DESC
        `;

        const [rows] = await db.query(sql);

        return rows;
    },

    async getById(id){

        const [rows]=await db.query(

            `SELECT
                p.*,
                t.title AS topic_title

            FROM progress_reports p

            JOIN topics t
            ON p.topic_id=t.id

            WHERE p.id=?`,

            [id]

        );

        return rows[0];

    },

    async create(data){

        const sql=`

        INSERT INTO progress_reports
        (
            topic_id,
            description,
            lecturer_comment
        )

        VALUES (?,?,?)

        `;

        const [result]=await db.query(sql,data);

        return result;

    },

    async update(id,data){

        const sql=`

        UPDATE progress_reports

        SET

        description=?,

        lecturer_comment=?

        WHERE id=?

        `;

        const [result]=await db.query(

            sql,

            [...data,id]

        );

        return result;

    },

    async delete(id){

        const [result]=await db.query(

            "DELETE FROM progress_reports WHERE id=?",

            [id]

        );

        return result;

    }

}

module.exports=Progress;