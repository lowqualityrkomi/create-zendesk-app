/**
 * This function get the answers provided by the user and return the manifest.json content
 * @param {Array} answers An arry of answers provided by the user
 * @returns {Promise} a promise that provide the manifest.json content
 */

const createManifestContent = answers => {
	return {
		name: answers.name,
		author: {
			name: answers.authorName,
			email: answers.authorEmail,
			url: answers.authorWebSite
		},
		defaultLocale: 'en',
		private: true,
		location: {
			support: {
				[answers.appLocation]: {
					url: setUrl(answers.frameworkType),
					flexible: true
				}
			}
		},
		version: '1.0',
		frameworkVersion: '2.0'
	};
};

function setUrl(frameworkType) {
	switch (frameworkType) {
		case 'vanilla':
			return 'assets/index.html';
		case 'react':
			return 'dist/index.html';
	}
}

module.exports = createManifestContent;
