module.exports = {
    create: bookService => async (req, res) => {
        const { title, year, cost } = req.body;
        const id = await bookService.createNewBook({ title, year, cost });
        res.json({ id });
    },

    findAll: bookService => async (req, res) => {
        const { scroll, limit = 25 } = req.query;
        const list = await bookService.findAllBooks({ scroll, limit });
        res.json(list);
    },

    findById: bookService => async (req, res) => {
        const { id } = req.params;
        const book = await bookService.findBookById(id);
        if (!book) {
            res.status(404);
            res.json({
                status: "Not Found",
                message: `Book with id ${id} not found`,
                statusCode: 404,
            });
            return;
        }
        res.json(book);
    },

    update: bookService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await bookService.updateBook(id, change);
        res.send();
    },

    deleteById: bookService => async (req, res) => {
        const { id } = req.params;
        await bookService.deleteBook(id);
        res.send();
    },
};
