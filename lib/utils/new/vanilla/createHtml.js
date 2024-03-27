const fs = require("fs-extra");

const createHtml = (projectDir, answers) => {
	const projectPath = projectDir === "." ? process.cwd() : `${process.cwd()}/${projectDir}`;
	const pathApp = projectPath + "/assets";
	const locations = answers.appLocation;

	for (let i = 0; i < locations.length; i++) {
		const fileName = pathApp + `/${locations[i]}.html`;
		fs.ensureFileSync(fileName);
		fs.writeFileSync(
			fileName,
			`
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="UTF-8" />
					${getUiLibrary(answers.ui)}
					<!-- App CSS -->
					<link rel="stylesheet" href="./css/app/main.css" />
				</head>

				<body>
					<!-- Write there the HTML code of your app -->
				</body>
				${getJavascriptLibrary(answers.ui)}
				<!-- Zendesk JS -->
				<script src="./js/zendesk/index.js"></script>
				<!-- App JS -->
				<script src="./js/app/${locations[i]}.js"></script>
			</html>
		`
		);
	}
};

function getUiLibrary(ui) {
	switch (ui) {
		case "bootstrap":
			return `
			<!-- Bootstrap CSS -->
			<!-- Documentation: https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->
			<link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css" />
			`;
		case "garden":
			return `
			<!-- Garden CSS -->
			<!-- Documentation: https://garden.zendesk.com/ -->
			<link rel="stylesheet" href="./css/zendesk/garden.css" />
			`;
		case "mui":
			return `
			<!-- Material CSS -->
			<!-- Documentation: https://m2.material.io/develop/web/getting-started -->
			<link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" />
			`;
		default:
			return "";
	}
}

function getJavascriptLibrary(ui) {
	switch (ui) {
		case "bootstrap":
			return `
			<!-- Bootstrap JS -->
			<script src="./js/bootstrap/bootstrap.bundle.min.js"></script>
			`;
		case "garden":
			return ``;
		case "mui":
			return `
			<!-- Material JS -->
			<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
			`;
		default:
			return "";
	}
}

module.exports = createHtml;
