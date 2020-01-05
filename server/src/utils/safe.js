module.exports = function safe(fn) {
    return async (req, res, next, ...rest) => {
        try {
            await fn(req, res, next, ...rest);
        } catch (error) {
            res.status(500);
            res.send({
                status: "Internal Server Error",
                message: "Unknown error occurred",
                statusCode: 500,
            });
        }
    };
};
