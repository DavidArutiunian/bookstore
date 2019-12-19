const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = {
    findById: async (id = MissingArgument("Missing Book id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
            SELECT
                id_book,
                title,
                year,
                cost
            FROM book
            WHERE id_book = ?
        `,
            [id],
        );
        return result[0][0];
    },

    findAll: async (condition = {}) => {
        const conn = await getConnection();
        const params = [];
        let sql = `
            SELECT
                id_book,
                title,
                year,
                cost
            FROM book
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND id_book >= ? `;
            params.push(condition.scroll);
        }
        sql += ` ORDER BY id_book `;
        if (condition.limit) {
            sql += ` LIMIT ? `;
            params.push(condition.limit);
        }
        const result = await conn.execute(sql, params);
        return result[0];
    },

    insert: async (values = MissingArgument("Missing Book values")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO book(title, year, cost)
                VALUES(?, ?, ?)
            `,
            [values.title, values.year, values.cost],
        );
        return result[0].insertId;
    },

    update: async (id = MissingArgument("Missing Book id"), change = {}) => {
        const conn = await getConnection();
        let sql = "UPDATE book SET";
        const params = [];
        if (change.title) {
            sql += " title = ? ";
            params.push(change.title);
        }
        if (change.year) {
            sql += " year = ? ";
            params.push(change.year);
        }
        if (change.cost) {
            sql += " cost = ? ";
            params.push(change.cost);
        }
        sql += " WHERE id_book = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
    },

    deleteById: async (id = MissingArgument("Missing Book id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM book WHERE id_book = ?", [id]);
    },
};
