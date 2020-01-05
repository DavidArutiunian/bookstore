const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403);
        res.json({
            status: "Not Authorized",
            message: "Authorization error",
            statusCode: 403,
        });
    } else {
        try {
            req.user = jwt.verify(token, process.env.AUTH_SECRET);
            next();
        } catch {
            res.status(403);
            res.json({
                status: "Not Authorized",
                message: "Authorization error",
                statusCode: 403,
            });
        }
    }
};
