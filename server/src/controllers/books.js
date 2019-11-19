const getConnection = require("db");

function create() {
    return async (req, res, next) => {
        const { title, year, cost } = req.body;
        const conn = await getConnection();
        const result = await conn.execute(
            `
                INSERT INTO book(title, year, cost)
                VALUES(?, ?, ?)
            `,
            [title, year, cost],
        );
        res.json({ id: result[0].insertId });
        next();
    };
}

function findAll() {
    return async (req, res, next) => {
        const { scroll, limit = 25 } = req.query;
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
        if (scroll) {
            sql += ` AND id_book >= ? `;
            params.push(scroll);
        }
        sql += ` ORDER BY id_book `;
        if (limit) {
            sql += ` LIMIT ? `;
            params.push(limit);
        }
        const result = await conn.execute(sql, params);
        res.json(result[0]);
        next();
    };
}

function findById() {
    return async (req, res, next) => {
        const { id } = req.params;
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
        res.json(result[0][0]);
        next();
    };
}

module.exports = {
    create,
    findAll,
    findById,
};
