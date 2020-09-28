let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


let conf = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};

module.exports = conf;