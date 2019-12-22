const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const PrettyError = require("pretty-error");

const app = express();

// CORS setup
app.use(cors());

// Middleware for parsing HTTP body
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// Book API
const bookRouter = require("./routes/books");
const bookRepository = require("./repositories/book");
const bookService = require("./services/books")(bookRepository);
app.use("/api/books", bookRouter(bookService));

// Publishing Office API
const publishingOfficeRouter = require("./routes/publishing_office");
const publishingOfficeRepository = require("./repositories/publishing_office");
const publishingOfficeService = require("./services/publishing_office")(publishingOfficeRepository);
app.use("/api/publishing_office", publishingOfficeRouter(publishingOfficeService));

// Pretty errors
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage("express");

// Pretty render uncaught errors
app.use((error, req, res, next) => {
    process.stderr.write(pe.render(error));
    next();
});

module.exports = app;
