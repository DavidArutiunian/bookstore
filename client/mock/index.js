module.exports = () => ({
    authors: {
        rows: [
            {
                name: "John",
                surname: "Doe",
                date_of_birth: "1980-01-01",
                id_publishing_office: 1,
            },
        ],
        relations: {
            publishing_office: {
                id_publishing_office: 1,
                name: "name",
                address: "address",
                email: "email@email.com",
            },
        },
    },
});
