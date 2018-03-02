var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var appEnv = process.env.NODE_ENV || 'development';

var config = {
	entry: './src/js/seaowl.js',

	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: 'raw-loader'
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader'
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
			inject: 'body',
			minify: false
		}),
		new webpack.EnvironmentPlugin({
			BROKER_HOST: 'localhost',
			BROKER_PORT: 9001,
			BROKER_PATH: '/ws'
		})
	],
};

if (appEnv === 'development') {
	config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
	config.plugins.push(
		new CleanPlugin(['dist'])
	);
}

module.exports = config;
