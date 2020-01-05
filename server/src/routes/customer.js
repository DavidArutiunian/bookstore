const express = require("express");
const customer = require("../controllers/customer");
const safe = require("../utils/safe");

module.exports = (customerService, ...middleware) => {
    const router = new express.Router();

    router.post("/", ...middleware, safe(customer.create(customerService)));

    router.get("/", ...middleware, safe(customer.findAll(customerService)));

    router.get("/:id", ...middleware, safe(customer.findById(customerService)));

    router.put("/:id", ...middleware, safe(customer.update(customerService)));

    router.delete("/:id", ...middleware, safe(customer.deleteById(customerService)));

    return router;
};
