const { execSync } = require('child_process');
const chalk = require('chalk');

/**
 * Initialize framework for the project
 *
 * @param {string} directoryPath - the path of the directory
 * @param {string} frameworkType - the framework selected by the user
 */
const installDependencies = (directoryPath, frameworkType) => {
	if (frameworkType !== 'vanilla') {
		console.log(
			`📦 ${chalk
				.bgHex('#CD0000')
				.white('Initializing Framework in ', directoryPath)}`
		);
		console.log('This will take some time, please stay awhile...');

		execSync('npm i', { cwd: directoryPath, stdio: 'inherit' });
		console.log();
	}
};

module.exports = installDependencies;
