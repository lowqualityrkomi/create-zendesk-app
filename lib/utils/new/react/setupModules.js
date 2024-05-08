const fs = require("fs-extra");
const path = require("path");

const setupModules = (projectDir, answers) => {
	const projectPath = projectDir === "." ? process.cwd() : `${process.cwd()}/${projectDir}`;
	const pathApp = projectPath + "/src/javascripts/modules";
	const locations = answers.appLocation;

	const assetsDir = path.join("new", "react", "assets", "utils");
	const utilsPath = path.resolve(__dirname, "..", "..", assetsDir);

	for (let i = 0; i < locations.length; i++) {
		const location = locations[i];
		console.log("location ", location);
		const modulePath = pathApp + `/${location}`;
		fs.mkdirSync(pathApp);
		fs.mkdirSync(modulePath);
		fs.mkdirSync(modulePath + `/components`);
		fs.mkdirSync(modulePath + `/pages`);
		fs.mkdirSync(modulePath + `/utils`);
		fs.ensureFileSync(modulePath + `/index.js`);
		fs.ensureFileSync(modulePath + `/App.js`);

		switch (answers.ui) {
			case "bootstrap":
				// Create index.js
				fs.writeFile(
					modulePath + `/index.js`,
					`
					import React from "react";
					import { render } from "react-dom";
					import { ThemeProvider, Container, Row, Col, ListGroup } from "react-bootstrap";
					import I18n from "../../lib/i18n";
					import { resizeContainer, escapeSpecialChars as escape } from "../../lib/helpers";
					import { App } from "./App";

					class AppProvider {
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

							const appContainer = document.querySelector(".main");

							render(
								<ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
									<App />
								</ThemeProvider>,
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
				`
				);

				fs.writeFile(
					pathApp + `/${location}/App.js`,
					`
					import React from 'react';
					import { Button } from 'react-bootstrap';

					export const App = () => {
						return (
							<div>
								<Button variant="primary">Hello world!</Button>
							</div>
						);
					};
					`
				);
				break;
			case "mui":
				fs.writeFile(
					pathApp + `/${location}/index.js`,
					`
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
				`
				);

				fs.writeFile(
					pathApp + `/${location}/App.js`,
					`
					import * as React from "react";
					import Button from "@mui/material/Button";

					export const App = () => {
						return (
							<div>
								<Button variant="contained">Hello World</Button>
							</div>
						);
					};
					`
				);
				break;
			case "garden":
				fs.writeFile(
					pathApp + `/${location}/index.js`,
					`
					import React from 'react'
					import { render } from 'react-dom'
					import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
					import { Grid, Row, Col } from '@zendeskgarden/react-grid'
					import { UnorderedList } from '@zendeskgarden/react-typography'
					import I18n from '../../javascripts/lib/i18n'
					import { resizeContainer, escapeSpecialChars as escape } from '../../javascripts/lib/helpers'
					import { App } from "./App";

					const MAX_HEIGHT = 1000
					const API_ENDPOINTS = {
					organizations: '/api/v2/organizations.json'
					}

					class AppProvider {
					constructor (client, _appData) {
						this._client = client

						// this.initializePromise is only used in testing
						// indicate app initilization(including all async operations) is complete
						this.initializePromise = this.init()
					}

					/**
					 * Initialize module, render main template
					 */
					async init () {
						const currentUser = (await this._client.get('currentUser')).currentUser

						const appContainer = document.querySelector('.main')

						render(
						<ThemeProvider theme={{ ...DEFAULT_THEME }}>
							<App />
						</ThemeProvider>,
						appContainer
						)
					}

					/**
					 * Handle error
					 * @param {Object} error error object
					 */
					_handleError (error) {
						console.log('An error is handled here: ', error.message)
					}
					}

					export default AppProvider;
					`
				);

				fs.writeFile(
					pathApp + `/${location}/App.js`,
					`
					import React from 'react';
					import { Anchor } from '@zendeskgarden/react-buttons';
					import { Row, Col } from '@zendeskgarden/react-grid';

					export const App = () => {
						return (
							<Row>
								<Col textAlign="center">
									<Anchor href="#default">Hello world!</Anchor>
								</Col>
							</Row>
						);
					};
					`
				);
				break;
			default:
				fs.writeFile(
					pathApp + `/${location}/index.js`,
					`
					import React from "react";
					import { render } from "react-dom";
					import I18n from "../../javascripts/lib/i18n";
					import { resizeContainer, escapeSpecialChars as escape } from "../../javascripts/lib/helpers";
					import { App } from "./App";

					class AppProvider {
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

							const appContainer = document.querySelector(".main");

							render(
								<div>
									<App />
								</div>,
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
					`
				);

				fs.writeFile(
					pathApp + `/${location}/App.js`,
					`
					import React from 'react';

					export const App = () => {
						return (
							<div>
								<button>Hello world!</button>
							</div>
						);
					};
					`
				);
		}

		fs.copySync(utilsPath, modulePath + "/utils");

		const files = fs.readdirSync(modulePath + "/utils");
	}
};

module.exports = setupModules;
