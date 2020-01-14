const errors = require("../errors");

module.exports = {
    create: publishingOfficeService => async (req, res) => {
        const { name, address, email } = req.body;
        const id = await publishingOfficeService.createNewPublishingOffice({
            name,
            address,
            email,
        });
        res.json({ id });
    },

    findAll: publishingOfficeService => async (req, res) => {
        const { scroll, limit = 25, ...order } = req.query;
        const list = await publishingOfficeService.findAllPublishingOffices(
            { scroll, limit },
            order,
        );
        res.json(list);
    },

    findById: publishingOfficeService => async (req, res) => {
        const { id } = req.params;
        const office = await publishingOfficeService.findPublishingOfficeById(id);
        if (!office) {
            const error = errors.NotFound(`Publishing Office with id ${id} not found`);
            res.status(error.statusCode);
            res.json(error);
            return;
        }
        res.json(office);
    },

    update: publishingOfficeService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await publishingOfficeService.updatePublishingOffice(id, change);
        res.send();
    },

    deleteById: publishingOfficeService => async (req, res) => {
        const { id } = req.params;
        await publishingOfficeService.deletePublishingOffice(id);
        res.send();
    },
};
