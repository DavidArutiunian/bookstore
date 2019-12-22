const express = require("express");
const offices = require("../controllers/publishing_office");
const safe = require("../utils/safe");

module.exports = publishingOfficeService => {
    const router = new express.Router();

    router.post("/", safe(offices.create(publishingOfficeService)));

    router.get("/", safe(offices.findAll(publishingOfficeService)));

    router.get("/:id", safe(offices.findById(publishingOfficeService)));

    router.put("/:id", safe(offices.update(publishingOfficeService)));

    router.delete("/:id", safe(offices.deleteById(publishingOfficeService)));

    return router;
};
