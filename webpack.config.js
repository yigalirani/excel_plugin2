/* eslint-disable no-undef */

const CopyWebpackPlugin = require("copy-webpack-plugin");
const CustomFunctionsMetadataPlugin = require("custom-functions-metadata-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
    functions: "./src/functions/functions.js",
    taskpane: "./src/taskpane/taskpane.js",
    commands: "./src/commands/commands.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".html", ".js"],
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
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new CustomFunctionsMetadataPlugin({
      output: "functions.json",
      input: "./src/functions/functions.js",
    }),

    new HtmlWebpackPlugin({
      filename: "taskpane.html",
      template: "./src/taskpane/taskpane.html",
      chunks: ["polyfill", "taskpane", "commands", "functions"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets/icon-*",
          to: "assets/[name][ext][query]",
        },
      ],
    }),
  ],
};
