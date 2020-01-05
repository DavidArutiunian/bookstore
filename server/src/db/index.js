const mysql = require("mysql2/promise");
const argon2 = require("argon2");

let initialized = false;
let connection = null;

module.exports = async () => {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DB,
        });
    }
    const login = process.env.ADMIN_USERNAME || "admin";
    if (!initialized) {
        const row = await connection.execute(
            `
                SELECT password
                FROM employee
                WHERE login = ?
                ORDER BY id_employee
                LIMIT 1
            `,
            [login],
        );
        const admin = row[0][0];
        if (admin && admin.password) {
            initialized = true;
        }
    }
    if (!initialized) {
        const password = process.env.ADMIN_PASSWORD || "password";
        try {
            const hash = await argon2.hash(password);
            await connection.execute(
                `
                    INSERT INTO employee(login, password, is_admin)
                    VALUES(?, ?, ?)
                `,
                [login, hash, true],
            );
        } catch {}
        initialized = true;
    }
    return connection;
};
