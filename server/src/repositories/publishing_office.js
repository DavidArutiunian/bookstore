const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = sqlOrderService => ({
    findById: async (id = MissingArgument("Missing Publishing Office id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
            SELECT
                id_publishing_office,
                name,
                address,
                email
            FROM publishing_office
            WHERE id_publishing_office = ?
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
                p.id_publishing_office,
                p.name,
                p.address,
                p.email
            FROM publishing_office p
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND p.id_publishing_office >= ?`;
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

    insert: async (values = MissingArgument("Missing Publishing Office values")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO publishing_office(name, address, email)
                VALUES(?, ?, ?)
            `,
            [values.name, values.address, values.email],
        );
        return result[0].insertId;
    },

    update: async (id = MissingArgument("Missing Publishing Office id"), change = {}) => {
        const conn = await getConnection();
        let sql = "UPDATE publishing_office SET";
        const params = [];
        if (change.name) {
            sql += " name = ? ";
            params.push(change.name);
        }
        if (change.address) {
            sql += " address = ? ";
            params.push(change.address);
        }
        if (change.email) {
            sql += " email = ? ";
            params.push(change.email);
        }
        sql += " WHERE id_publishing_office = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
    },

    deleteById: async (id = MissingArgument("Missing Publishing Office id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM publishing_office WHERE id_publishing_office = ?", [id]);
    },
});
