import ProfileInput from "components/ProfileInput";
import React from "react";

export default {
    create: ({ rules, name, title, value, editing, handleChange, ...rest }) => (
        <ProfileInput
            {...rest}
            readOnly={!editing}
            rules={rules}
            name={name}
            title={title}
            value={value}
            onChange={handleChange(name)}
        />
    ),
};
