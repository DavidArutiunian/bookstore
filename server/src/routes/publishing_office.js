const express = require("express");
const office = require("../controllers/publishing_office");
const safe = require("../utils/safe");

module.exports = (publishingOfficeService, ...middleware) => {
    const router = new express.Router();

    router.post("/", ...middleware, safe(office.create(publishingOfficeService)));

    router.get("/", ...middleware, safe(office.findAll(publishingOfficeService)));

    router.get("/:id", ...middleware, safe(office.findById(publishingOfficeService)));

    router.put("/:id", ...middleware, safe(office.update(publishingOfficeService)));

    router.delete("/:id", ...middleware, safe(office.deleteById(publishingOfficeService)));

    return router;
};
