import React from "react";
import ProfileSelect from "components/ProfileSelect";

export default {
    create: ({ rules, name, title, value, options, handleChange, ...rest }) => (
        <ProfileSelect
            {...rest}
            rules={rules}
            name={name}
            title={title}
            value={value ?? ""}
            onChange={handleChange(name)}
            options={options}
        />
    ),
};
