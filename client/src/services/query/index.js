export default {
    orderToQuery: order => {
        return Object.keys(order)
            .map(key => `${key}=${order[key]}`)
            .join("&");
    },
};
