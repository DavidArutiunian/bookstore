module.exports = {
    create: bookService => async (req, res, next) => {
        const { title, year, cost } = req.body;
        const id = await bookService.createNewBook({ title, year, cost });
        res.json({ id });
        next();
    },

    findAll: bookService => async (req, res, next) => {
        const { scroll, limit = 25 } = req.query;
        const list = await bookService.findAllBooks({ scroll, limit });
        res.json(list);
        next();
    },

    findById: bookService => async (req, res, next) => {
        const { id } = req.params;
        const book = await bookService.findBookById(id);
        res.json(book);
        next();
    },
};
