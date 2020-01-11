import React from "react";
import ProfileSelect from "components/ProfileSelect";

export default {
    create: ({ rules, name, title, value, editing, options, handleChange, multiple, ...rest }) => (
        <ProfileSelect
            {...rest}
            readOnly={!editing}
            multiple={multiple}
            rules={rules}
            name={name}
            title={title}
            value={value ?? (multiple ? [] : "")}
            onChange={handleChange(name)}
            options={options}
        />
    ),
};
