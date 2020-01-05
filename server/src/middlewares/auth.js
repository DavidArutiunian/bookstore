const errors = require("../errors");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const error = errors.NotAuthorized();
    const token = req.headers.authorization;
    if (!token) {
        res.status(error.statusCode);
        res.json(error);
    } else {
        try {
            req.user = jwt.verify(token, process.env.AUTH_SECRET);
            next();
        } catch {
            res.status(error.statusCode);
            res.json(error);
        }
    }
};
