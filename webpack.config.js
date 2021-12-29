/* eslint-disable no-undef */

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
    functions: "./src/functions.js",
    taskpane: "./src/taskpane.js",
    commands: "./src/commands.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets/icon-*",
          to: "assets/[name][ext][query]",
        },
        {
          from: "src/*.(css|json|html)",
          to: "[name][ext]",
        },
      ],
    }),
  ],
};
