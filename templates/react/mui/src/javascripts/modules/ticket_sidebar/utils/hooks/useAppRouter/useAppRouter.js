import React, { useState, createContext, useContext } from "react";

// Create a context to hold the current route value
const AppRouterContext = createContext();

// Custom hook to access the router context
const useAppRouter = () => useContext(AppRouterContext);

// Provider component that wraps the app and manages the router state
const AppRouterProvider = ({ children }) => {
	const [route, setRoute] = useState("/dashboard");
	const [history, setHistory] = useState(["/dashboard"]);

	// Function to update the route
	const updateRoute = (newRoute) => {
		setHistory((prevHistory) => [...prevHistory, route]);
		setRoute(newRoute);
	};

	//Function to move back to the previous route
	const goBack = () => {
		setHistory((prevHistory) => {
			const newHistory = [...prevHistory];
			newHistory.pop();
			return newHistory;
		});

		setRoute(() => {
			const prevHistory = [...history];
			const prevRoute = prevHistory.pop();
			return prevRoute;
		});
	};

	//Function to extracts and returns the query parameters from the current route
	const getQueryParams = () => {
		const urlParams = new URLSearchParams(route.slice(route.indexOf("?")));
		const queryParams = {};

		for (let [key, value] of urlParams) {
			queryParams[key] = value;
		}

		return queryParams;
	};

	// Create the value object to be passed to the context provider
	const routerValue = { route, updateRoute, getQueryParams, goBack };

	return <AppRouterContext.Provider value={routerValue}>{children}</AppRouterContext.Provider>;
};

export { useAppRouter, AppRouterProvider };
