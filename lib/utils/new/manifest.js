/**
 * This function get the answers provided by the user and return the manifest.json content
 * @param {Array} answers An arry of answers provided by the user
 * @returns {Promise} a promise that provide the manifest.json content
 */

const createManifestContent = (answers) => {
	return {
		name: answers.name,
		author: {
			name: answers.authorName,
			email: answers.authorEmail,
			url: answers.authorWebSite,
		},
		defaultLocale: "en",
		private: true,
		location: {
			support: {
				...createLocations(answers),
			},
		},
		version: "1.0",
		frameworkVersion: "2.0",
	};
};

function createLocations(answers) {
	let support = {};
	const locations = answers.appLocation;

	for (let i = 0; i < locations.length; i++) {
		support[locations[i]] = {
			url: setUrl(answers.frameworkType, locations[i]),
		};
	}

	return support;
}

function setUrl(frameworkType, location) {
	switch (frameworkType) {
		case "vanilla":
			return `assets/${location}.html`;
		case "react":
			return `dist/${location}.html`;
	}
}

module.exports = createManifestContent;
