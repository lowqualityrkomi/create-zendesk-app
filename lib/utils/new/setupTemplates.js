const fs = require("fs-extra");

const setupTemplates = (projectDir, answers) => {
	const projectPath = projectDir === "." ? process.cwd() : `${process.cwd()}/${projectDir}`;
	const pathApp = projectPath + "/src/templates";
	const locations = answers.appLocation;

	for (let i = 0; i < locations.length; i++) {
		const fileName = pathApp + `/${locations[i]}.html`;

		fs.ensureFileSync(fileName);
		fs.writeFile(
			fileName,
			`
			<!-- <%= htmlWebpackPlugin.options.warning %> -->
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<% _.forEach(htmlWebpackPlugin.options.vendorCSS, function(CSS) { %>
					<link rel="stylesheet" href="<%= CSS %>" />
					<% }); %>
				</head>

				<body>
					<section data-main class="main">
						<img class="loader" src="spinner.gif" />
					</section>
					<% _.forEach(htmlWebpackPlugin.options.vendorJs, function(js) { %>
					<script type="text/javascript" src="<%= js %>"></script>
					<% }); %>
				</body>
			</html>
		`
		);
	}
};

module.exports = setupTemplates;
