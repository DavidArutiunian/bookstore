module.exports = repository => ({
    findBookById: async id => {
        return repository.findById(id);
    },

    findAllBooks: async condition => {
        return repository.findAll(condition);
    },

    createNewBook: async values => {
        return repository.insert(values);
    },
});
