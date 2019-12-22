const getConnection = require("../db");

module.exports = repository => ({
    findPublishingOfficeById: async id => {
        return repository.findById(id);
    },

    findAllPublishingOffices: async condition => {
        return repository.findAll(condition);
    },

    createNewPublishingOffice: async values => {
        return repository.insert(values);
    },

    updatePublishingOffice: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const office = await repository.findById(id);
            const payload = { ...office, ...change };
            await repository.update(id, payload);
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        } finally {
            await conn.query("COMMIT");
        }
    },

    deletePublishingOffice: async id => {
        return repository.deleteById(id);
    },
});
