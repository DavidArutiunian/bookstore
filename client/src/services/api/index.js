import ky from "ky";

export default ky.create({
    prefixUrl: process.env.REACT_APP_API,
    hooks: {
        afterResponse: [
            async (_req, _opts, res) => {
                // clear local storage & reload page
                // if unauthorized error
                if (res.status === 403) {
                    localStorage.clear();
                    window.location.reload();
                }
            },
        ],
    },
});
