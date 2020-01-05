module.exports = {
    NotFound: (message = "Not Found") => ({
        status: "Not Found",
        message,
        statusCode: 404,
    }),
    NotAuthorized: (message = "Not Authorized") => ({
        status: "Not Authorized",
        message,
        statusCode: 403,
    }),
    InternalServerError: (message = "Internal Server Error") => ({
        status: "Internal Server Error",
        message,
        statusCode: 500,
    }),
};
