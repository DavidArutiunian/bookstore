import InputError from "components/InputError";
import React from "react";

export default {
    create: (errors, name) =>
        errors[name] && (
            <InputError
                message={
                    errors[name].type === "minLength"
                        ? errors[name].message ?? "Недостаточно символов"
                        : errors[name].type === "maxLength"
                        ? errors[name].message ?? "Превышено максимальное количество символов"
                        : errors[name].type === "pattern"
                        ? errors[name].message ?? "Неверный формат поля"
                        : errors[name].message
                }
            />
        ),
};
