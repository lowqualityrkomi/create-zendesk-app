const fs = require("fs-extra");

const writeWebpackConfig = (webpackContent, projectDir, frameworkType) => {
	const rootPath = projectDir === "." ? "." : `./${projectDir}`;
	const webpackConfigPath = `${rootPath}/webpack.config.js`;

	fs.writeFileSync(webpackConfigPath, webpackContent);
};

module.exports = writeWebpackConfig;
