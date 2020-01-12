const express = require("express");
const order = require("../controllers/order");
const safe = require("../utils/safe");

module.exports = (orderService, ...middleware) => {
    const router = new express.Router();

    router.post("/", ...middleware, safe(order.create(orderService)));

    router.get("/", ...middleware, safe(order.findAll(orderService)));

    router.get("/:id", ...middleware, safe(order.findById(orderService)));

    router.put("/:id", ...middleware, safe(order.update(orderService)));

    router.delete("/:id", ...middleware, safe(order.deleteById(orderService)));

    return router;
};
