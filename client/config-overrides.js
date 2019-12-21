const {
    useBabelRc,
    override,
    addBundleVisualizer,
    addBabelPlugins,
    addWebpackAlias,
    addBabelPresets,
} = require("customize-cra");

module.exports = override(
    useBabelRc(),
    addBundleVisualizer({}, true),
    addWebpackAlias({ "react-dom": "@hot-loader/react-dom" }),
    ...addBabelPlugins("emotion", "react-hot-loader/babel"),
    ...addBabelPresets(["@emotion/babel-preset-css-prop"]),
);
