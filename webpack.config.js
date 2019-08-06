const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (_, argv) => {
	const isProduction = !argv.mode || argv.mode === 'production';
	const config = {
		entry: './src/index.js',
		target: 'node',
		mode: isProduction ? 'production' : 'development',
		devtool: '#sourcemap',
		externals: [nodeExternals()],
		output: {
			filename: 'index.js',
			libraryTarget: 'commonjs2',
			path: path.resolve(__dirname, isProduction ? 'dist' : 'dev'),
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
			],
		},
		plugins: [],
		optimization: {
			minimizer: [],
		},
	};

	if (!isProduction) {
		if (argv.nodemon) {
			config.plugins.push(
				new WebpackShellPlugin({
					onBuildEnd: ['nodemon dev/index.js --watch dev'],
				}),
			);
		}
		config.plugins.push(
			new webpack.BannerPlugin({
				banner: 'require("source-map-support").install();',
				raw: true,
				entryOnly: false,
			}),
		);
		config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
	} else {
		config.module.rules.push({
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				emitWarning: true,
				failOnError: false,
				failOnWarning: false,
			},
		});
		config.optimization.minimizer.push(new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }));
	}

	return config;
};
