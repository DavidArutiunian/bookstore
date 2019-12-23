const express = require("express");
const author = require("../controllers/author");
const safe = require("../utils/safe");

module.exports = authorService => {
    const router = new express.Router();

    router.post("/", safe(author.create(authorService)));

    router.get("/", safe(author.findAll(authorService)));

    router.get("/:id", safe(author.findById(authorService)));

    router.put("/:id", safe(author.update(authorService)));

    router.delete("/:id", safe(author.deleteById(authorService)));

    return router;
};
