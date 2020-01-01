import InputError from "components/InputError";
import React from "react";

export default {
    create: (errors, name) =>
        errors[name] && (
            <InputError
                message={
                    errors[name].type === "minLength"
                        ? "Недостаточно символов"
                        : errors[name].type === "maxLength"
                        ? "Превышено максимальное количество символов"
                        : errors[name].type === "pattern"
                        ? "Неверный формат поля"
                        : errors[name].message
                }
            />
        ),
};
