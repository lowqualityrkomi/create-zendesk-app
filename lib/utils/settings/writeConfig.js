const fs = require('fs-extra');
const path = require('path');

const writeConfig = configs => {
	const configPath = path.resolve(
		__dirname
			.replace('/lib/utils/settings', '')
			.replace('\\lib\\utils\\settings', ''),
		'config.json'
	);

	let file = JSON.parse(fs.readFileSync(configPath));

	file.author.name = configs.name;
	file.author.email = configs.email;
	file.author.url = configs.url;

	fs.writeFileSync(configPath, JSON.stringify(file, null, '\t'));
};

module.exports = writeConfig;
