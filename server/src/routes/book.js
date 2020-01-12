const express = require("express");
const book = require("../controllers/book");
const safe = require("../utils/safe");

module.exports = (bookService, ...middleware) => {
    const router = new express.Router();

    router.post("/", ...middleware, safe(book.create(bookService)));

    router.get("/", ...middleware, safe(book.findAll(bookService)));

    router.get("/top", ...middleware, safe(book.findTopMostPopular(bookService)));

    router.get("/:id", ...middleware, safe(book.findById(bookService)));

    router.put("/:id", ...middleware, safe(book.update(bookService)));

    router.delete("/:id", ...middleware, safe(book.deleteById(bookService)));

    return router;
};
