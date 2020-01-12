const getConnection = require("../db");

module.exports = repository => ({
    findOrderById: async id => {
        return repository.findById(id);
    },

    findAllOrders: async condition => {
        return repository.findAll(condition);
    },

    createNewOrder: async values => {
        return repository.insert(values);
    },

    updateOrder: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const office = await repository.findById(id);
            const payload = { ...office, ...change };
            await repository.update(id, payload);
            await conn.query("COMMIT");
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        }
    },

    deleteOrder: async id => {
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
