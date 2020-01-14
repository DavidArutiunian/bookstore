const getConnection = require("../db");

module.exports = repository => ({
    findAuthorById: async id => {
        const author = await repository.findById(id);
        if (!author) {
            return author;
        }
        const row = {
            id_author: author.id_author,
            name: author.author_name,
            surname: author.surname,
            date_of_birth: author.date_of_birth,
            id_publishing_office: author.id_publishing_office,
        };
        const office = {
            id_publishing_office: author.id_publishing_office,
            name: author.publishing_office_name,
            address: author.address,
            email: author.email,
        };
        return {
            row,
            relation: {
                publishing_office: office,
            },
        };
    },

    findAllAuthors: async (condition, order) => {
        const authors = await repository.findAll(condition, order);
        const rows = authors.map(author => ({
            id_author: author.id_author,
            name: author.author_name,
            surname: author.surname,
            date_of_birth: author.date_of_birth,
            id_publishing_office: author.id_publishing_office,
        }));
        const offices = authors
            .map(author => ({
                id_publishing_office: author.id_publishing_office,
                name: author.publishing_office_name,
                address: author.address,
                email: author.email,
            }))
            // unique values
            .filter(
                (relation, index, array) =>
                    array.findIndex(
                        value => value.id_publishing_office === relation.id_publishing_office,
                    ) === index,
            );
        return {
            rows,
            relations: {
                publishing_office: offices,
            },
        };
    },

    createNewAuthor: async values => {
        return repository.insert(values);
    },

    updateAuthor: async (id, change) => {
        const conn = await getConnection();
        await conn.query("START TRANSACTION");
        try {
            const office = await repository.findById(id);
            const payload = { ...office, ...change };
            await repository.update(id, payload);
            await conn.query("COMMIT");
        } catch (e) {
            await conn.query("ROLLBACK");
            throw e;
        }
    },

    deleteAuthor: async id => {
        return repository.deleteById(id);
    },
});
