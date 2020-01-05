const express = require("express");
const employee = require("../controllers/employee");
const safe = require("../utils/safe");

module.exports = (employeeService, ...middleware) => {
    const router = new express.Router();

    router.post("/", ...middleware, safe(employee.create(employeeService)));

    router.get("/", ...middleware, safe(employee.findAll(employeeService)));

    router.get("/:id", ...middleware, safe(employee.findById(employeeService)));

    router.put("/:id", ...middleware, safe(employee.update(employeeService)));

    router.delete("/:id", ...middleware, safe(employee.deleteById(employeeService)));

    router.post("/login", safe(employee.login(employeeService)));

    return router;
};
