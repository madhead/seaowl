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
				test: /\.html$/,
				exclude: /node_modules/,
				use: 'raw-loader'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
			inject: 'body',
			minify: false
		})
	],

	devServer: {
		contentBase: './src',
		noInfo: false,
		hot: true,
		disableHostCheck: true
	}
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
