const fs = require('fs-extra');
const path = require('path');

const copyTemplate = (projectDir, type, ui) => {
	const templateDir =
		process.platform === 'win32'
			? `.\\templates\\${type}\\${ui}\\`
			: `./templates/${type}/${ui}/`;
	const templatePath = path.resolve(
		__dirname
			.replace('/lib/utils/new', '')
			.replace('\\lib\\utils\\new', ''),
		templateDir
	);

	const projectPath =
		projectDir === '.' ? process.cwd() : `${process.cwd()}/${projectDir}`;

	fs.copySync(templatePath, projectPath);

	const files = fs.readdirSync(projectPath);

	if (files.length === 0) {
		return false;
	}

	return true;
};

module.exports = copyTemplate;
