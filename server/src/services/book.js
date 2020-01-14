const getConnection = require("../db");

module.exports = repository => ({
    findBookById: async id => {
        return repository.findById(id);
    },

    findAllBooks: async (condition, order) => {
        return repository.findAll(condition, order);
    },

    findTopMostPopularBooks: async limit => {
        return repository.findTopMostPopular(limit);
    },

    createNewBook: async values => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const result = repository.insert(values);
            await conn.query("COMMIT");
            return result;
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        }
    },

    updateBook: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const book = await repository.findById(id);
            const payload = { ...book, ...change };
            await repository.update(id, payload);
            await conn.query("COMMIT");
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        }
    },

    deleteBook: async id => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            await repository.deleteById(id);
            await conn.query("COMMIT");
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        }
    },
});
