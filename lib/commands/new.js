//Importing npm packages
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
//Importing lib/utils functions
const createManifestContent = require('../utils/new/manifest');
const writeManifest = require('../utils/new/writeManifest');
const getPrompts = require('../utils/new/prompts');
const copyTemplate = require('../utils/new/copy');
const initVcs = require('../utils/new/vcs');
const installDependencies = require('../utils/new/dependencies');
//Setup inquirer
const prompt = inquirer.createPromptModule();

const newProject = async input => {
	const projectDir = input.length < 2 ? '.' : input[1];
	const projectPath = projectDir === '.' ? './' : `./${projectDir}`;

	// Check if a directory with the same provided name already exists
	if (projectPath !== './' && fs.existsSync(projectPath)) {
		console.log(
			chalk.red(
				`ERROR: A folder named ${projectDir} already exists in this directory`
			)
		);
		process.exit(0);
	}

	console.log(
		`✨ Starting create a new Zendesk app in ${chalk.bold.cyan(projectDir)}`
	);
	console.log();

	//Get answers from user
	const answers = await prompt(
		getPrompts(
			projectDir !== '.' ? projectDir : path.basename(process.cwd())
		)
	);

	console.log();

	// Check projectDir. If projectDir !== '.' create new folder and work inside it
	if (projectDir !== '.') {
		fs.mkdirSync(projectPath);
	}

	// Copy the template inside the projectDir
	if (!copyTemplate(projectDir, answers.frameworkType, answers.ui)) {
		console.log(chalk.red(`ERROR: Unable to create the project`));
	}

	//Create the manifest.json content
	const manifest = createManifestContent(answers);

	// Create manifest.json in the projectDir
	writeManifest(manifest, projectDir, answers.frameworkType);

	// If git is set, run 'git init'
	initVcs(projectPath, answers.vcs);

	// If frameworkType !== 'vanilla', run 'npm install'
	installDependencies(projectPath, answers.frameworkType);

	//Final message :)
	console.log(
		chalk`\n🎉  {bold Successfully created project} {cyan ${answers.name}}\n`
	);

	console.log(chalk`  {bold To get started:}\n`);

	console.log(chalk`\t{cyan Take a coffe ☕}`);
	console.log(
		chalk`\t{cyan Open ${chalk.green(answers.name)} in your favourite IDE}`
	);
	console.log(chalk`\t{cyan Enjoy your coding session}\n`);
};

module.exports = newProject;
