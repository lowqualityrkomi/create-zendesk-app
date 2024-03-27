const { execSync } = require("child_process");
const chalk = require("chalk");

/**
 * Initialize framework for the project
 *
 * @param {string} directoryPath - the path of the directory
 * @param {string} frameworkType - the framework selected by the user
 */
const installDependencies = (directoryPath, frameworkType, ui) => {
	if (frameworkType !== "vanilla") {
		console.log(`📦 ${chalk.bgHex("#CD0000").white("Initializing Framework in ", directoryPath)}`);
		console.log("This will take some time, please stay awhile...");

		execSync("npm i", { cwd: directoryPath, stdio: "inherit" });

		switch (ui) {
			case "mui":
				execSync("npm install @mui/material @emotion/react @emotion/styled @mui/icons-material", {
					cwd: directoryPath,
					stdio: "inherit",
				});
				break;
			case "garden":
				execSync(
					"npm install @zendeskgarden/css-bedrock @zendeskgarden/react-accordions @zendeskgarden/react-avatars @zendeskgarden/react-breadcrumbs @zendeskgarden/react-buttons @zendeskgarden/react-chrome @zendeskgarden/react-colorpickers @zendeskgarden/react-datepickers @zendeskgarden/react-dropdowns @zendeskgarden/react-forms @zendeskgarden/react-grid @zendeskgarden/react-loaders @zendeskgarden/react-modals @zendeskgarden/react-notifications @zendeskgarden/react-pagination @zendeskgarden/react-tabs @zendeskgarden/react-tables @zendeskgarden/react-tags @zendeskgarden/react-theming @zendeskgarden/react-tooltips @zendeskgarden/react-typography",
					{
						cwd: directoryPath,
						stdio: "inherit",
					}
				);
				break;
			case "bootstrap":
				execSync("npm install react-bootstrap bootstrap", {
					cwd: directoryPath,
					stdio: "inherit",
				});

				break;
			default:
		}

		console.log();
	}
};

module.exports = installDependencies;
