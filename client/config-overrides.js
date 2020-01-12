const {
    override,
    addBundleVisualizer,
    addBabelPlugins,
    addWebpackAlias,
    addBabelPresets,
} = require("customize-cra");

module.exports = override(
    addBundleVisualizer({}, true),
    addWebpackAlias({ "react-dom": "@hot-loader/react-dom" }),
    ...addBabelPlugins("emotion", "react-hot-loader/babel"),
    ...addBabelPresets(["@emotion/babel-preset-css-prop"]),
);
