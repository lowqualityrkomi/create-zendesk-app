import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const UserLoggedProvider = ({ user, children }) => {
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Custom hook to access the client prop value
export const useUserLogged = () => {
	const user = useContext(UserContext);
	if (!user) {
		throw new Error("useZendesk must be used within a ZendeskProvider");
	}
	return user;
};
