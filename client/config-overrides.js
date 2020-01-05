const {
    useBabelRc,
    override,
    addBundleVisualizer,
    addBabelPlugins,
    addWebpackAlias,
    addBabelPresets,
    addWebpackPlugin,
} = require("customize-cra");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = override(
    useBabelRc(),
    addBundleVisualizer({}, true),
    addWebpackAlias({ "react-dom": "@hot-loader/react-dom" }),
    ...addBabelPlugins("emotion", "react-hot-loader/babel"),
    ...addBabelPresets(["@emotion/babel-preset-css-prop"]),
    addWebpackPlugin(new HardSourceWebpackPlugin()),
);
