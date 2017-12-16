const path = require('path');

module.exports = {
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "js/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'stage-0']
      }
    }]
  }
}