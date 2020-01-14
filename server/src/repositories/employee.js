const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = sqlOrderService => ({
    findById: async (id = MissingArgument("Missing Employee id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                SELECT
                    id_employee,
                    name,
                    login,
                    date_of_birth,
                    address,
                    is_admin
                FROM employee
                WHERE id_employee = ?
            `,
            [id],
        );
        return result[0][0];
    },

    findByLogin: async (login = MissingArgument("Missing Employee login")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                SELECT
                    id_employee,
                    login,
                    password
                FROM employee
                WHERE login = ?
            `,
            [login],
        );
        return result[0][0];
    },

    findAll: async (condition = {}, order = {}) => {
        const conn = await getConnection();
        const params = [];
        let sql = `
            SELECT
                e.id_employee,
                e.name,
                e.login,
                e.date_of_birth,
                e.address,
                e.is_admin
            FROM employee e
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND e.id_employee >= ?`;
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

    insert: async (values = MissingArgument("Missing Employee values")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO employee(name, login, password, date_of_birth, address)
                VALUES(?, ?, ?, ?, ?)
            `,
            [values.name, values.login, values.password, values.date_of_birth, values.address],
        );
        return result[0].insertId;
    },

    update: async (id = MissingArgument("Missing Employee id"), change = {}) => {
        const conn = await getConnection();
        let sql = "UPDATE employee SET";
        const params = [];
        if (change.name) {
            sql += " name = ? ";
            params.push(change.name);
        }
        if (change.address) {
            sql += " address = ? ";
            params.push(change.address);
        }
        if (change.date_of_birth) {
            sql += " date_of_birth = ? ";
            params.push(change.date_of_birth);
        }
        sql += " WHERE id_employee = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
    },

    deleteById: async (id = MissingArgument("Missing Employee id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM employee WHERE id_employee = ?", [id]);
    },
});
