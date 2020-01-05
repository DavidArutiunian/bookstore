const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = {
    findById: async (id = MissingArgument("Missing Customer id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
            SELECT
                id_customer,
                name,
                date_of_birth,
                email
            FROM customer
            WHERE id_customer = ?
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
                id_customer,
                name,
                date_of_birth,
                email
            FROM customer
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND id_customer >= ?`;
            params.push(condition.scroll);
        }
        sql += ` ORDER BY id_customer `;
        if (condition.limit) {
            sql += ` LIMIT ? `;
            params.push(condition.limit);
        }
        const result = await conn.execute(sql, params);
        return result[0];
    },

    insert: async (values = MissingArgument("Missing Customer values")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO customer(name, date_of_birth, email)
                VALUES(?, ?, ?)
            `,
            [values.name, values.date_of_birth, values.email],
        );
        return result[0].insertId;
    },

    update: async (id = MissingArgument("Missing Customer id"), change = {}) => {
        const conn = await getConnection();
        let sql = "UPDATE customer SET";
        const params = [];
        if (change.name) {
            sql += " name = ? ";
            params.push(change.name);
        }
        if (change.address) {
            sql += " date_of_birth = ? ";
            params.push(change.address);
        }
        if (change.email) {
            sql += " email = ? ";
            params.push(change.email);
        }
        sql += " WHERE id_customer = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
    },

    deleteById: async (id = MissingArgument("Missing Customer id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM customer WHERE id_customer = ?", [id]);
    },
};
