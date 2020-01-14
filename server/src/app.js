const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const BodyParser = require("body-parser");
const PrettyError = require("pretty-error");
const pino = require("pino")({ prettyPrint: true });
const logger = require("express-pino-logger")({ logger: pino });
const auth = require("./middlewares/auth");
const SqlOrderService = require("./providers/order");

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
const bookSqlOrderService = SqlOrderService("b", "id_book");
const bookRouter = require("./routes/book");
const bookRepository = require("./repositories/book");
const bookService = require("./services/book")(bookRepository(bookSqlOrderService));
app.use("/api/book", auth, bookRouter(bookService));

// Publishing Office API
const publishingOfficeSqlOrderService = SqlOrderService("p", "id_publishing_office");
const publishingOfficeRouter = require("./routes/publishing_office");
const publishingOfficeRepository = require("./repositories/publishing_office");
const publishingOfficeService = require("./services/publishing_office")(
    publishingOfficeRepository(publishingOfficeSqlOrderService),
);
app.use("/api/publishing_office", auth, publishingOfficeRouter(publishingOfficeService));

// Author API
const authorSqlOrderService = SqlOrderService("a", "id_author");
const authorRouter = require("./routes/author");
const authorRepository = require("./repositories/author");
const authorService = require("./services/author")(authorRepository(authorSqlOrderService));
app.use("/api/author", auth, authorRouter(authorService));

// Customer API
const customerSqlOrderService = SqlOrderService("c", "id_customer");
const customerRouter = require("./routes/customer");
const customerRepository = require("./repositories/customer");
const customerService = require("./services/customer")(customerRepository(customerSqlOrderService));
app.use("/api/customer", auth, customerRouter(customerService));

// Employee API
const employeeSqlOrderService = SqlOrderService("e", "id_employee");
const employeeRouter = require("./routes/employee");
const employeeRepository = require("./repositories/employee");
const employeeService = require("./services/employee")(employeeRepository(employeeSqlOrderService));
app.use("/api/employee", employeeRouter(employeeService, auth));

// Order API
const orderSqlOrderService = SqlOrderService("o", "id_order");
const orderRouter = require("./routes/order");
const orderRepository = require("./repositories/order");
const orderService = require("./services/order")(orderRepository(orderSqlOrderService));
app.use("/api/order", orderRouter(orderService, auth));

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
