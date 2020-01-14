const errors = require("../errors");

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
        const { scroll, limit = 25, ...order } = req.query;
        const list = await authorService.findAllAuthors({ scroll, limit }, order);
        res.json(list);
    },

    findById: authorService => async (req, res) => {
        const { id } = req.params;
        const author = await authorService.findAuthorById(id);
        if (!author) {
            const error = errors.NotFound(`Author with id ${id} not found`);
            res.status(error.statusCode);
            res.json(error);
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
