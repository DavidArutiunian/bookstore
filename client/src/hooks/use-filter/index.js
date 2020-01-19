import { useState } from "react";
import { useDebounce, useUnmount } from "react-use";

export default function useFilter(order, doOnChange) {
    const [filter, setFilter] = useState("");

    const [, cancel] = useDebounce(() => doOnChange(order, filter), 100, [filter]);

    useUnmount(() => cancel());

    const handleSearchChange = event => setFilter(event.target.value);

    return [filter, handleSearchChange];
}
