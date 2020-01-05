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
            res.status(403);
            res.json({
                status: "Not Authorized",
                message: "Authorization error",
                statusCode: 403,
            });
        }
    },

    findAll: employeeService => async (req, res) => {
        const { scroll, limit = 25 } = req.query;
        const list = await employeeService.findAllEmployees({ scroll, limit });
        res.json(list);
    },

    findById: employeeService => async (req, res) => {
        const { id } = req.params;
        const employee = await employeeService.findEmployeeById(id);
        if (!employee) {
            res.status(404);
            res.json({
                status: "Not Found",
                message: `Employee with id ${id} not found`,
                statusCode: 404,
            });
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
        await employeeService.deleteEmployee(id);
        res.send();
    },
};
