const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/index.js', './src/styles/main.scss']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  output: {
    path: path.resolve(__dirname, "wp-content/themes/dl2026"),
    filename: "[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": {
                  "node": "18",
                  "chrome": "110",
                  "firefox": "110",
                  "safari": "16"
                }
              }],
              '@babel/preset-react'
            ],
            "plugins": ['styled-jsx/babel']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i
      }),
      new CssMinimizerPlugin()
    ]
  }
}
