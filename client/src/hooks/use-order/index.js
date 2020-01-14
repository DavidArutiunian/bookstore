import { useEffect, useState } from "react";

export const Sort = {
    None: 0,
    Asc: 1,
    Desc: -1,
};

const ORDER_STATE_MAP = {
    [Sort.None]: () => Sort.Asc,
    [Sort.Asc]: () => Sort.Desc,
    [Sort.Desc]: () => Sort.None,
};

export default function useOrder(doOnToggle) {
    const [order, setOrder] = useState({});

    const toggleOrder = column => () => {
        const sort = order[column] ?? Sort.None;
        order[column] = ORDER_STATE_MAP[sort]();
        setOrder({ ...order });
    };

    useEffect(() => {
        const keys = Object.keys(order);
        const sorts = keys
            .filter(key => order[key] !== Sort.None)
            .reduce((acc, key) => {
                acc[key] = order[key];
                return acc;
            }, {});
        if (doOnToggle) {
            doOnToggle(sorts);
        }
    }, [order, doOnToggle]);

    return [order, toggleOrder];
}
