const fs = require("fs-extra");

const setupLocations = (projectDir, answers) => {
	const projectPath = projectDir === "." ? process.cwd() : `${process.cwd()}/${projectDir}`;
	const pathApp = projectPath + "/src/javascripts/locations";
	const locations = answers.appLocation;

	for (let i = 0; i < locations.length; i++) {
		const fileName = pathApp + `/${locations[i]}.js`;
		fs.ensureFileSync(fileName);
		fs.writeFile(
			fileName,
			`
			import AppProvider from "../modules/${locations[i]}";

			/* global ZAFClient */
			const client = ZAFClient.init();

			client.on("app.registered", function (appData) {
				return new AppProvider(client, appData);
			});
		`
		);
	}
};

module.exports = setupLocations;
