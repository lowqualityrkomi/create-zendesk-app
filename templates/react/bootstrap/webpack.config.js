const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TranslationsPlugin = require("./webpack/translations-plugin");

const externalAssets = {
	js: ["https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js"],
	css: ["https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"],
};

module.exports = {
	entry: {
		ticket_sidebar: ["@babel/polyfill", "./src/javascripts/locations/ticket_sidebar.js", "./src/index.css"],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist/assets"),
	},
	module: {
		rules: [
			{
				test: /\.js$|jsx/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
				},
			},
			{
				type: "javascript/auto",
				test: /\.json$/,
				include: path.resolve(__dirname, "./src/translations"),
				use: "./webpack/translations-loader",
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { url: false } }, "postcss-loader"],
			},
		],
	},

	plugins: [
		// Empties the dist folder
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), "dist/**/*")],
		}),

		// Copy over static assets
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/manifest.json", to: "../[name][ext]" },
				{ from: "src/images/*", to: "./[name][ext]" },
			],
		}),

		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),

		new TranslationsPlugin({
			path: path.resolve(__dirname, "./src/translations"),
		}),

		new HtmlWebpackPlugin({
			warning:
				"AUTOMATICALLY GENERATED FROM ./src/templates/ticket_sidebar.html - DO NOT MODIFY THIS FILE DIRECTLY",
			vendorJs: externalAssets.js,
			template: "./src/templates/ticket_sidebar.html",
			filename: "ticket_sidebar.html",
			chunks: ["ticket_sidebar"],
		}),
	],
};
