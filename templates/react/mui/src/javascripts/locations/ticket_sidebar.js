import AppProvider from "../modules/ticket_sidebar";

/* global ZAFClient */
const client = ZAFClient.init();

client.on("app.registered", function (appData) {
	return new AppProvider(client, appData);
});
