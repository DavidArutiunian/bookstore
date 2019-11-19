const express = require("express");
const books = require("controllers/books");
const safe = require("utils/safe");

const router = new express.Router();

router.post("/", safe(books.create()));

router.get("/", safe(books.findAll()));

router.get("/:id", safe(books.findById()));

module.exports = router;
