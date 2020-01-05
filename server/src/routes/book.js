const express = require("express");
const book = require("../controllers/book");
const safe = require("../utils/safe");

module.exports = bookService => {
    const router = new express.Router();

    router.post("/", safe(book.create(bookService)));

    router.get("/", safe(book.findAll(bookService)));

    router.get("/:id", safe(book.findById(bookService)));

    router.put("/:id", safe(book.update(bookService)));

    router.delete("/:id", safe(book.deleteById(bookService)));

    return router;
};
