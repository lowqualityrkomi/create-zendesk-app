/**
 *  Example app
 **/
import React from "react";
import { render } from "react-dom";
import I18n from "../../javascripts/lib/i18n";
import { resizeContainer, escapeSpecialChars as escape } from "../../javascripts/lib/helpers";

const MAX_HEIGHT = 1000;
const API_ENDPOINTS = {
	organizations: "/api/v2/organizations.json",
};

class App {
	constructor(client, _appData) {
		this._client = client;

		// this.initializePromise is only used in testing
		// indicate app initilization(including all async operations) is complete
		this.initializePromise = this.init();
	}

	/**
	 * Initialize module, render main template
	 */
	async init() {
		const currentUser = (await this._client.get("currentUser")).currentUser;

		I18n.loadTranslations(currentUser.locale);

		const organizationsResponse = await this._client
			.request(API_ENDPOINTS.organizations)
			.catch(this._handleError.bind(this));

		const organizations = organizationsResponse ? organizationsResponse.organizations : [];

		const appContainer = document.querySelector(".main");

		render(
			<div>
				<p>Start with the new project</p>
			</div>,
			appContainer
		);
		return resizeContainer(this._client, MAX_HEIGHT);
	}

	/**
	 * Handle error
	 * @param {Object} error error object
	 */
	_handleError(error) {
		console.log("An error is handled here: ", error.message);
	}
}

export default App;
