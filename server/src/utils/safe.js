function safe(fn) {
    return async (req, res, next, ...rest) => {
        try {
            await fn(req, res, next, ...rest);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = safe;
