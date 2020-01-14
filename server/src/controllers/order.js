const errors = require("../errors");

module.exports = {
    create: orderService => async (req, res) => {
        const { id_customer, id_employee, date, books } = req.body;
        const id = await orderService.createNewOrder({ id_customer, id_employee, date, books });
        res.json({ id });
    },

    findAll: orderService => async (req, res) => {
        const { scroll, limit = 25, ...order } = req.query;
        const list = await orderService.findAllOrders({ scroll, limit }, order);
        res.json(list);
    },

    findById: orderService => async (req, res) => {
        const { id } = req.params;
        const order = await orderService.findOrderById(id);
        if (!order) {
            const error = errors.NotFound(`Order with id ${id} not found`);
            res.status(error.statusCode);
            res.json(error);
            return;
        }
        res.json(order);
    },

    update: orderService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await orderService.updateOrder(id, change);
        res.send();
    },

    deleteById: orderService => async (req, res) => {
        const { id } = req.params;
        await orderService.deleteOrder(id);
        res.send();
    },
};
