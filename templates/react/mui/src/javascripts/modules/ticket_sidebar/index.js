/**
 *  Example app
 **/
import React from "react";
import { render } from "react-dom";
import I18n from "../../lib/i18n";
import { resizeContainer, escapeSpecialChars as escape } from "../../lib/helpers";
import { UserLoggedProvider, ZendeskProvider, AppRouterProvider } from "./utils/hooks";
import { App } from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

class AppProvider {
	constructor(client, _appData) {
		this._client = client;
		this._appData = _appData;

		// this.initializePromise is only used in testing
		// indicate app initilization(including all async operations) is complete
		this.initializePromise = this.init();
	}

	/**
	 * Initialize module, render main template
	 */
	async init() {
		const currentUser = (await this._client.get("currentUser")).currentUser;

		const appContainer = document.querySelector(".main");

		render(
			<ZendeskProvider client={this._client} appData={this._appData}>
				<UserLoggedProvider user={currentUser}>
					<AppRouterProvider>
						<App />
					</AppRouterProvider>
				</UserLoggedProvider>
			</ZendeskProvider>,
			appContainer
		);
	}

	/**
	 * Handle error
	 * @param {Object} error error object
	 */
	_handleError(error) {
		console.log("An error is handled here: ", error.message);
	}
}

export default AppProvider;
