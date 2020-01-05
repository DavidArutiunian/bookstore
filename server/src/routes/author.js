const express = require("express");
const author = require("../controllers/author");
const safe = require("../utils/safe");

module.exports = (authorService, ...middleware) => {
    const router = new express.Router();

    router.post("/", ...middleware, safe(author.create(authorService)));

    router.get("/", ...middleware, safe(author.findAll(authorService)));

    router.get("/:id", ...middleware, safe(author.findById(authorService)));

    router.put("/:id", ...middleware, safe(author.update(authorService)));

    router.delete("/:id", ...middleware, safe(author.deleteById(authorService)));

    return router;
};
