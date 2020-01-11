const errors = require("../errors");
const jwt = require("jsonwebtoken");

module.exports = {
    create: employeeService => async (req, res) => {
        const { name, login, password, date_of_birth, address } = req.body;
        const id = await employeeService.createNewEmployee({
            name,
            login,
            password,
            date_of_birth,
            address,
        });
        res.json({ id });
    },

    login: employeeService => async (req, res) => {
        const { login, password } = req.body;
        const employee = await employeeService.loginEmployee(login, password);
        if (employee) {
            const options = { expiresIn: process.env.AUTH_EXPIRES_IN };
            const token = jwt.sign({ ...employee }, process.env.AUTH_SECRET, options);
            res.json({ token });
        } else {
            const error = errors.NotAuthorized();
            res.status(error.statusCode);
            res.json(error);
        }
    },

    findAll: employeeService => async (req, res) => {
        const { scroll, limit = 25 } = req.query;
        const list = await employeeService.findAllEmployees({ scroll, limit });
        // return all except current user
        res.json(list.filter(employee => employee.id_employee !== req.user.id_employee));
    },

    findById: employeeService => async (req, res) => {
        const { id } = req.params;
        const employee = await employeeService.findEmployeeById(id);
        if (!employee) {
            const error = errors.NotFound(`Employee with id ${id} not found`);
            res.status(error.statusCode);
            res.json(error);
            return;
        }
        res.json(employee);
    },

    update: employeeService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await employeeService.updateEmployee(id, change);
        res.send();
    },

    deleteById: employeeService => async (req, res) => {
        const { id } = req.params;
        if (id === req.user.id_employee.toString()) {
            const error = errors.BadRequest("Cannot delete myself");
            res.status(error.statusCode);
            res.json(error);
            return;
        }
        await employeeService.deleteEmployee(id);
        res.send();
    },

    me: employeeService => async (req, res) => {
        const { id_employee } = req.user;
        const me = await employeeService.findEmployeeById(id_employee);
        res.json(me);
    },
};
