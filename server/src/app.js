const express = require("express");
const books = require("routes/books");
const cors = require("cors");
const BodyParser = require("body-parser");
const PrettyError = require("pretty-error");

const app = express();

app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use("/api/books", books);

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage("express");

app.use((error, req, res, next) => {
    process.stderr.write(pe.render(error));
    next();
});

module.exports = app;
