const express = require("express");
const offices = require("../controllers/customer");
const safe = require("../utils/safe");

module.exports = customerService => {
    const router = new express.Router();

    router.post("/", safe(offices.create(customerService)));

    router.get("/", safe(offices.findAll(customerService)));

    router.get("/:id", safe(offices.findById(customerService)));

    router.put("/:id", safe(offices.update(customerService)));

    router.delete("/:id", safe(offices.deleteById(customerService)));

    return router;
};
