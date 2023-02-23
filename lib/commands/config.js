//Importing npm packages
const inquirer = require('inquirer');
//Importing lib/utils functions
const getSettingsPrompts = require('../utils/settings/settingsPrompt');
const getAuthorPrompts = require('../utils/settings/authorPrompt');
const writeConfig = require('../utils/settings/writeConfig');

//Setup inquirer
const prompt = inquirer.createPromptModule();

const config = async () => {
	const answers = await prompt(getSettingsPrompts());

	switch (answers.choice) {
		case 'author':
			const authorAnswers = await prompt(getAuthorPrompts());
			writeConfig(authorAnswers);
			break;
	}
};

module.exports = config;
