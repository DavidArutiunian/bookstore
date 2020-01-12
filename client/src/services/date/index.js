import { format, parseISO } from "date-fns";

export default {
    format: date => format(parseISO(date), "yyyy-MM-dd"),
};
