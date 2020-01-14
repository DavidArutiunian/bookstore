const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = sqlOrderService => ({
    findById: async (id = MissingArgument("Missing Order id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                SELECT o.id_order,
                       o.date,
                       json_arrayagg(b.id_book) AS books,
                       o.id_customer,
                       o.id_employee
                FROM \`order\` o
                         LEFT JOIN book_x_order bo ON bo.id_order = o.id_order
                         LEFT JOIN book b ON b.id_book = bo.id_book
                WHERE o.id_order = ?
                GROUP BY o.id_order, o.date
                ORDER BY o.date;
            `,
            [id],
        );
        return result[0][0];
    },

    findAll: async (condition = {}, order = {}) => {
        const conn = await getConnection();
        const params = [];
        let sql = `
            SELECT o.id_order,
                   o.date,
                   json_arrayagg(b.id_book) AS books,
                   o.id_customer,
                   o.id_employee
            FROM \`order\` o
                     LEFT JOIN book_x_order bo ON bo.id_order = o.id_order
                     LEFT JOIN book b ON b.id_book = bo.id_book
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND id_order >= ?`;
            params.push(condition.scroll);
        }
        sql += " GROUP BY o.id_order, o.date ";
        sql += sqlOrderService.construct(order);
        if (condition.limit) {
            sql += ` LIMIT ? `;
            params.push(condition.limit);
        }
        const result = await conn.execute(sql, params);
        return result[0];
    },

    insert: async (values = MissingArgument("Missing Order values")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO \`order\`(id_customer, id_employee, date)
                VALUES(?, ?, ?)
            `,
            [values.id_customer, values.id_employee, values.date],
        );
        const id = result[0].insertId;
        await conn.execute(
            `
                INSERT INTO book_x_order(id_order, id_book)
                VALUES
                ${values.books.map(() => "(?, ?)").join(",")}
            `,
            [...values.books.flatMap(book => [id, book])],
        );
        return id;
    },

    update: async (id = MissingArgument("Missing Order id"), change = {}) => {
        const conn = await getConnection();
        let sql = "UPDATE `order` SET";
        const params = [];
        if (change.id_customer) {
            sql += " id_customer = ? ";
            params.push(change.id_customer);
        }
        if (change.id_employee) {
            sql += " id_employee = ? ";
            params.push(change.id_employee);
        }
        if (change.date) {
            sql += " date = ? ";
            params.push(change.date);
        }
        sql += " WHERE id_order = ?";
        params.push(id);
        sql = sql.replace(/(?<!WHERE )\?\W(?!(\W*)WHERE)/gim, "?,");
        await conn.execute(sql, params);
        await conn.execute(`DELETE FROM book_x_order WHERE id_order = ?`, [id]);
        if (change.books) {
            if (change.books) {
                await conn.execute(
                    `
                    INSERT INTO book_x_order(id_order, id_book)
                    VALUES
                    ${change.books.map(() => "(?, ?)").join(",")}
                `,
                    [...change.books.flatMap(book => [id, book])],
                );
            }
        }
    },

    deleteById: async (id = MissingArgument("Missing Order id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM book_x_order WHERE id_order = ?", [id]);
        await conn.execute("DELETE FROM `order` WHERE id_order = ?", [id]);
    },
});
