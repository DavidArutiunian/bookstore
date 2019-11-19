const app = require("app");
const getConnection = require("db");

const port = process.env.PORT;

app.listen(port, async () => {
    console.log(`Server started on port ${port}`);

    try {
        const conn = await getConnection();
        await conn.execute("SELECT 1");
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
});
