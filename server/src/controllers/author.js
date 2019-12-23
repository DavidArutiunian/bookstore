module.exports = {
    create: authorService => async (req, res) => {
        const { name, surname, date_of_birth, id_publishing_office } = req.body;
        const id = await authorService.createNewAuthor({
            name,
            surname,
            date_of_birth,
            id_publishing_office,
        });
        res.json({ id });
    },

    findAll: authorService => async (req, res) => {
        const { scroll, limit = 25 } = req.query;
        const list = await authorService.findAllAuthors({ scroll, limit });
        res.json(list);
    },

    findById: authorService => async (req, res) => {
        const { id } = req.params;
        const author = await authorService.findAuthorById(id);
        if (!author) {
            res.status(404);
            res.json({
                status: "Not Found",
                message: `Author with id ${id} not found`,
                statusCode: 404,
            });
            return;
        }
        res.json(author);
    },

    update: authorService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await authorService.updateAuthor(id, change);
        res.send();
    },

    deleteById: authorService => async (req, res) => {
        const { id } = req.params;
        await authorService.deleteAuthor(id);
        res.send();
    },
};
