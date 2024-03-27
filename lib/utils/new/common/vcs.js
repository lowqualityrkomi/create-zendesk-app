#!/usr/bin/env node
const { execSync } = require('child_process');
const chalk = require('chalk');

/**
 * Initialize version control system for the project
 *
 * @param {string} directoryPath - the path of the directory
 * @param {string} vcs - the version control system to initialize
 */
const initVcs = (directoryPath, vcs) => {
	if (vcs === 'git') {
		console.log(
			`🌱 ${chalk
				.bgHex('#f44d27')
				.white('Initializing Git in ', directoryPath)}`
		);

		execSync('git init', { cwd: directoryPath, stdio: 'inherit' });
		console.log();
	}
};

module.exports = initVcs;
