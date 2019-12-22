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
        const { scroll, limit = 25 } = req.query;
        const list = await publishingOfficeService.findAllPublishingOffices({ scroll, limit });
        res.json(list);
    },

    findById: publishingOfficeService => async (req, res) => {
        const { id } = req.params;
        const office = await publishingOfficeService.findPublishingOfficeById(id);
        if (!office) {
            res.status(404);
            res.json({
                status: "Not Found",
                message: `Publishing Office with id ${id} not found`,
                statusCode: 404,
            });
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
