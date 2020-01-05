const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = {
    findById: async (id = MissingArgument("Missing Employee id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
            SELECT
                id_employee,
                name,
                login,
                password,
                date_of_beginning_of_work,
                date_of_birth,
                address,
                isAdministration
            FROM employee
            WHERE id_employee = ?
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
                id_employee,
                name,
                login,
                password,
                date_of_beginning_of_work,
                date_of_birth,
                address,
                isAdministration
            FROM employee
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND id_employee >= ?`;
            params.push(condition.scroll);
        }
        sql += ` ORDER BY id_employee `;
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
                INSERT INTO employee(name, login, password, date_of_beginning_of_work, date_of_birth, address, isAdministration)
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `,
            [values.name, values.login, values.password, values.date_of_beginning_of_work, values.date_of_birth, values.address, values.isAdministration],
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
        if (change.login) {
            sql += " login = ? ";
            params.push(change.login);
        }
        if (change.name) {
            sql += " name = ? ";
            params.push(change.name);
        }
        if (change.name) {
            sql += " name = ? ";
            params.push(change.name);
        }
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
        sql += " WHERE id_employee = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
    },

    deleteById: async (id = MissingArgument("Missing Employee id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM employee WHERE id_employee = ?", [id]);
    },
};
