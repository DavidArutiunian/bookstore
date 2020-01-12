const errors = require("../errors");

module.exports = function safe(fn) {
    return async (req, res, next, ...rest) => {
        try {
            await fn(req, res, next, ...rest);
        } catch (err) {
            req.log.error(err);
            const error = errors.InternalServerError();
            res.status(error.statusCode);
            res.send(error);
        }
    };
};
