const fs = require('fs-extra');

const writeManifest = (manifestContent, projectDir, frameworkType) => {
	const rootPath = projectDir === '.' ? '.' : `./${projectDir}`;
	const manifestPath =
		frameworkType === 'vanilla'
			? `${rootPath}/manifest.json`
			: `${rootPath}/src/manifest.json`;

	fs.writeFileSync(manifestPath, JSON.stringify(manifestContent, null, '\t'));
};

module.exports = writeManifest;
