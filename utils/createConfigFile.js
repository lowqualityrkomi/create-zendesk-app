const fs = require('fs-extra');
const path = require('path');

const createConfigFile = () => {
	const configContent = {
		author: {
			name: '',
			email: '',
			url: ''
		}
	};

	const configPath = path.resolve(
		__dirname.replace('/utils', '').replace('\\utils', ''),
		'config.json'
	);

	fs.ensureFileSync(configPath);

	fs.writeFileSync(configPath, JSON.stringify(configContent, null, '\t'));
};

module.exports = createConfigFile;
