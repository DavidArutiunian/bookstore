import ProfileField from "components/ProfileField";
import React from "react";

export default {
    create: ({ rules, name, title, value, ...rest }) => (
        <ProfileField {...rest} rules={rules} name={name} title={title} value={value} />
    ),
};
