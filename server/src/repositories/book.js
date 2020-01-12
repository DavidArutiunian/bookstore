const getConnection = require("../db");
const { MissingArgument } = require("../utils/validator");

module.exports = {
    findById: async (id = MissingArgument("Missing Book id")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
            SELECT
                b.id_book,
                b.title,
                b.year,
                b.cost,
                json_arrayagg(a.id_author) AS authors
            FROM book b
            LEFT JOIN book_x_author ba ON ba.id_book = b.id_book
            LEFT JOIN author a ON a.id_author = ba.id_author
            WHERE b.id_book = ?
            GROUP BY b.id_book, b.title, b.year, b.cost;
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
                b.id_book,
                b.title,
                b.year,
                b.cost,
                json_arrayagg(a.id_author) AS authors
            FROM book b
            LEFT JOIN book_x_author ba ON ba.id_book = b.id_book
            LEFT JOIN author a ON a.id_author = ba.id_author
            WHERE 1 = 1
        `;
        if (condition.scroll) {
            sql += ` AND b.id_book >= ? `;
            params.push(condition.scroll);
        }
        sql += `
            GROUP BY b.id_book, b.title, b.year, b.cost
            ORDER BY b.id_book
        `;
        if (condition.limit) {
            sql += ` LIMIT ? `;
            params.push(condition.limit);
        }
        const result = await conn.execute(sql, params);
        return result[0];
    },

    findTopMostPopular: async (limit = MissingArgument("Missing limit")) => {
        const conn = await getConnection();
        const result = await conn.execute(
            `
                SELECT b.id_book, b.title, COUNT(bxo.id_book) as orders_count
                FROM book b
                LEFT JOIN book_x_order bxo ON b.id_book = bxo.id_book
                GROUP BY b.id_book, b.title
                ORDER BY orders_count DESC
                LIMIT ?
            `,
            [limit],
        );
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
        const id = result[0].insertId;
        await conn.execute(
            `
                INSERT INTO book_x_author(id_book, id_author)
                VALUES
                ${values.authors.map(() => "(?, ?)").join(",")}
            `,
            [...values.authors.flatMap(author => [id, author])],
        );
        return id;
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
        await conn.execute(`DELETE FROM book_x_author WHERE id_book = ?`, [id]);
        if (change.authors) {
            await conn.execute(
                `
                    INSERT INTO book_x_author(id_book, id_author)
                    VALUES
                    ${change.authors.map(() => "(?, ?)").join(",")}
                `,
                [...change.authors.flatMap(author => [id, author])],
            );
        }
    },

    deleteById: async (id = MissingArgument("Missing Book id")) => {
        const conn = await getConnection();
        await conn.execute("DELETE FROM book_x_author WHERE id_book = ?", [id]);
        await conn.execute("DELETE FROM book WHERE id_book = ?", [id]);
    },
};
