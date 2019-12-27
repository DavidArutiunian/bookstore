const app = require("./app");
const getConnection = require("./db");

const port = process.env.PORT;

app.listen(port, async () => {
    app.logger.info(`server started on port ${port}`);

    try {
        // Check if connection to DB exists
        const conn = await getConnection();
        await conn.execute("SELECT 1");
        app.logger.info("successfully connected to DB");
    } catch (error) {
        app.logger.error(error);
        process.exit(-1);
    }
});
