const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/index.js',
  target: 'node',
  devtool: '#sourcemap',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [],
  optimization: {
    minimizer: []
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ['nodemon dist/index.js --watch dist']
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  );
  config.optimization.minimizer.push(
    new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false })
  );
} else {
  config.module.rules.push({
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      emitWarning: true,
      failOnError: false,
      failOnWarning: false
    }
  });
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
