export default {
    orderToQuery: order => {
        if (!order) {
            return "";
        }
        return Object.keys(order)
            .map(key => `${key}=${order[key]}`)
            .join("&");
    },
};
