const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/client/index.jsx'),
  output: {
    path: path.join(__dirname, 'src/bundles'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/
      }
    ]
  }
}

