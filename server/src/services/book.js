const getConnection = require("../db");

module.exports = repository => ({
    findBookById: async id => {
        return repository.findById(id);
    },

    findAllBooks: async condition => {
        return repository.findAll(condition);
    },

    createNewBook: async values => {
        return repository.insert(values);
    },

    updateBook: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const book = await repository.findById(id);
            const payload = { ...book, ...change };
            await repository.update(id, payload);
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        } finally {
            await conn.query("COMMIT");
        }
    },

    deleteBook: async id => {
        return repository.deleteById(id);
    },
});
