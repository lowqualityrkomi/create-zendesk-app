import React, { createContext, useContext } from "react";

// Create a context to hold the client and appData prop values
const ZendeskContext = createContext();

// Create the ZendeskProvider component
export const ZendeskProvider = ({ client, appData, children }) => {
	return <ZendeskContext.Provider value={{ client, appData }}>{children}</ZendeskContext.Provider>;
};

// Custom hook to access the client and appData prop values
export const useZendesk = () => {
	const { client, appData } = useContext(ZendeskContext);
	if (!client || !appData) {
		throw new Error("useZendesk must be used within a ZendeskProvider");
	}
	return { client, appData };
};
