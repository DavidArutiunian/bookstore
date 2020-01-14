module.exports = (alias, primary) => ({
    construct: (order) => {
        if (!Object.keys(order).length) {
            return ` ORDER BY ${alias}.${primary} `;
        } else {
            return Object.keys(order).reduce((acc, key, index, array) => {
                const sort = order[key] === "1" ? "ASC" : "DESC";
                acc += ` ${alias}.${key} ${sort}`;
                // add comma if next order exists
                if (array.length - 1 >= index + 1) {
                    acc += ", ";
                }
                return acc;
            }, " ORDER BY ");
        }
    },
});
