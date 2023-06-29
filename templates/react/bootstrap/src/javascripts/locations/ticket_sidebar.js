import AppProvider from "../modules/app";

/* global ZAFClient */
const client = ZAFClient.init();

client.on("app.registered", function (appData) {
	return new AppProvider(client, appData);
});
