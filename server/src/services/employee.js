const argon2 = require("argon2");
const getConnection = require("../db");

module.exports = repository => ({
    findEmployeeById: async id => {
        return repository.findById(id);
    },

    findAllEmployees: async condition => {
        return repository.findAll(condition);
    },

    createNewEmployee: async values => {
        values.password = await argon2.hash(values.password);
        return repository.insert(values);
    },

    loginEmployee: async (login, password) => {
        const employee = await repository.findByLogin(login);
        const logged = await argon2.verify(employee.password, password);
        return logged && employee;
    },

    updateEmployee: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const employee = await repository.findById(id);
            const payload = { ...employee, ...change };
            await repository.update(id, payload);
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        } finally {
            await conn.query("COMMIT");
        }
    },

    deleteEmployee: async id => {
        return repository.deleteById(id);
    },
});
