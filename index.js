#!/usr/bin/env node

/**
 * create-zendesk-app
 * A tool to create new zendesk apps
 *
 * @author Mirko Casoni <https://github.com/lowqualityrkomi>
 */
//Importing npm packages
const fs = require('fs-extra');
const path = require('path');
//Importing utils files
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

//Check config file
const createConfigFile = require('./utils/createConfigFile');

if (!fs.existsSync(path.resolve(__dirname, 'config.json'))) {
	createConfigFile();
}
//Importing commands
const newProject = require('./lib/commands/new');
const createConfig = require('./lib/commands/config');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });

	if (input.length === 0) {
		cli.showHelp();
	} else {
		switch (input[0]) {
			case 'new':
				newProject(input);
				break;
			case 'config':
				createConfig();
				break;
			default:
				cli.showHelp();
		}
	}
})();
