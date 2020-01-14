const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = sqlOrderService => ({
    findById: async (id = MissingArgument("Missing Author id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
            SELECT
                a.id_author,
                a.name AS author_name,
                a.surname,
                a.date_of_birth,
                a.id_publishing_office,
                p.name AS publishing_office_name,
                p.address,
                p.email
            FROM author a
            LEFT JOIN publishing_office p
            ON p.id_publishing_office = a.id_publishing_office
            WHERE id_author = ?
            `,
            [id],
        );
        return result[0][0];
    },

    findAll: async (condition = {}, order = {}) => {
        const conn = await getConnection();
        const params = [];
        let sql = `
            SELECT
                a.id_author,
                a.name AS author_name,
                a.surname,
                a.date_of_birth,
                a.id_publishing_office,
                p.name AS publishing_office_name,
                p.address,
                p.email
            FROM author a
            LEFT JOIN publishing_office p
            ON p.id_publishing_office = a.id_publishing_office
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND a.id_author >= ?`;
            params.push(condition.scroll);
        }
        sql += sqlOrderService.construct(order);
        if (condition.limit) {
            sql += ` LIMIT ? `;
            params.push(condition.limit);
        }
        const result = await conn.execute(sql, params);
        return result[0];
    },

    insert: async (values = MissingArgument("Missing Author values")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO author(name, surname, date_of_birth, id_publishing_office)
                VALUES(?, ?, ?, ?)
            `,
            [values.name, values.surname, values.date_of_birth, values.id_publishing_office],
        );
        return result[0].insertId;
    },

    update: async (id = MissingArgument("Missing Author id"), change = {}) => {
        const conn = await getConnection();
        let sql = "UPDATE author SET";
        const params = [];
        if (change.name) {
            sql += " name = ? ";
            params.push(change.name);
        }
        if (change.surname) {
            sql += " surname = ? ";
            params.push(change.surname);
        }
        if (change.date_of_birth) {
            sql += " date_of_birth = ? ";
            params.push(change.date_of_birth);
        }
        if (change.id_publishing_office) {
            sql += " id_publishing_office = ? ";
            params.push(change.id_publishing_office);
        }
        sql += " WHERE id_author = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
    },

    deleteById: async (id = MissingArgument("Missing Author id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM author WHERE id_author = ?", [id]);
    },
});
