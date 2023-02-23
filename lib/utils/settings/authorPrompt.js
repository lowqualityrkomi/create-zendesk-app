const config = require('../../../config.json');

const getAuthorPrompt = () => {
	return [
		{
			name: 'name',
			type: 'input',
			message: 'Insert the author name:',
			default: config.author.name
		},
		{
			name: 'email',
			type: 'input',
			message: 'Insert the author email:',
			default: config.author.email
		},
		{
			name: 'url',
			type: 'input',
			message: 'Insert the author website:',
			default: config.author.url
		}
	];
};

module.exports = getAuthorPrompt;
