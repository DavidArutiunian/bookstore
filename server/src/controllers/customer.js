module.exports = {
    create: customerService => async (req, res) => {
        const { name, date_of_birth, email } = req.body;
        const id = await customerService.createNewCustomer({
            name,
            date_of_birth,
            email,
        });
        res.json({ id });
    },

    findAll: customerService => async (req, res) => {
        const { scroll, limit = 25 } = req.query;
        const list = await customerService.findAllCustomers({ scroll, limit });
        res.json(list);
    },

    findById: customerService => async (req, res) => {
        const { id } = req.params;
        const customer = await customerService.findCustomerById(id);
        if (!customer) {
            res.status(404);
            res.json({
                status: "Not Found",
                message: `Customer with id ${id} not found`,
                statusCode: 404,
            });
            return;
        }
        res.json(customer);
    },

    update: customerService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await customerService.updateCustomer(id, change);
        res.send();
    },

    deleteById: customerService => async (req, res) => {
        const { id } = req.params;
        await customerService.deleteCustomer(id);
        res.send();
    },
};
