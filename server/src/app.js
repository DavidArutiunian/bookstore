const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const BodyParser = require("body-parser");
const PrettyError = require("pretty-error");
const pino = require("pino")({ prettyPrint: true });
const logger = require("express-pino-logger")({ logger: pino });
const auth = require("./middlewares/auth");

const app = express();

if (process.env.NODE_ENV !== "test") {
    // CORS & helmet setup
    app.use(cors());
    app.use(helmet());

    // Logger setup
    app.use(logger);
}

// Middleware for parsing HTTP body
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// Book API
const bookRouter = require("./routes/book");
const bookRepository = require("./repositories/book");
const bookService = require("./services/book")(bookRepository);
app.use("/api/book", auth, bookRouter(bookService));

// Publishing Office API
const publishingOfficeRouter = require("./routes/publishing_office");
const publishingOfficeRepository = require("./repositories/publishing_office");
const publishingOfficeService = require("./services/publishing_office")(publishingOfficeRepository);
app.use("/api/publishing_office", auth, publishingOfficeRouter(publishingOfficeService));

// Author API
const authorRouter = require("./routes/author");
const authorRepository = require("./repositories/author");
const authorService = require("./services/author")(authorRepository);
app.use("/api/author", auth, authorRouter(authorService));

// Customer API
const customerRouter = require("./routes/customer");
const customerRepository = require("./repositories/customer");
const customerService = require("./services/customer")(customerRepository);
app.use("/api/customer", auth, customerRouter(customerService));

// Employee API
const employeeRouter = require("./routes/employee");
const employeeRepository = require("./repositories/employee");
const employeeService = require("./services/employee")(employeeRepository);
app.use("/api/employee", employeeRouter(employeeService, auth));

if (process.env.NODE_ENV !== "test") {
    // Pretty errors
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage("express");

    // Pretty render uncaught errors
    app.use((error, req, res, next) => {
        process.stderr.write(pe.render(error));
        next();
    });
}

module.exports = app;
module.exports.logger = pino;
