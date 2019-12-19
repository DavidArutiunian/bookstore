const express = require("express");
const books = require("../controllers/books");
const safe = require("../utils/safe");

module.exports = bookService => {
    const router = new express.Router();

    router.post("/", safe(books.create(bookService)));

    router.get("/", safe(books.findAll(bookService)));

    router.get("/:id", safe(books.findById(bookService)));

    router.put("/:id", safe(books.update(bookService)));

    router.delete("/:id", safe(books.deleteById(bookService)));

    return router;
};
