const fs = require("fs-extra");

const createJavascript = (projectDir, answers) => {
	const projectPath = projectDir === "." ? process.cwd() : `${process.cwd()}/${projectDir}`;
	const pathApp = projectPath + "/assets/js/app";
	const locations = answers.appLocation;

	for (let i = 0; i < locations.length; i++) {
		const fileName = pathApp + `/${locations[i]}.js`;
		fs.ensureFileSync(fileName);
		fs.writeFileSync(
			fileName,
			`
			const client = ZAFClient.init();

			/* Write there your javascript code */
		`
		);
	}
};

module.exports = createJavascript;
