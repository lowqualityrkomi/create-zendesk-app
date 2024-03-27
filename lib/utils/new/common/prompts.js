const config = require("../../../../config.json");
const getPrompts = (projectDir) => {
	return [
		{
			name: "name",
			type: "input",
			message: "Project name:",
			default: projectDir === "." ? "directory-name" : projectDir,
		},
		{
			name: "frameworkType",
			type: "list",
			message: "Framework type:",
			default: "vanilla",
			choices: [
				{ name: "Vanilla", value: "vanilla" },
				{ name: "React", value: "react" },
			],
		},
		{
			name: "ui",
			type: "list",
			message: "UI Framework:",
			default: "none",
			choices: [
				{ name: "None", value: "none" },
				{ name: "Bootstrap", value: "bootstrap" },
				{ name: "MUI", value: "mui" },
				{ name: "Zendesk Garden", value: "garden" },
			],
		},
		{
			name: "vcs",
			type: "list",
			message: "Version control system:",
			default: "git",
			choices: [
				{ name: "Git", value: "git" },
				{ name: "None", value: "none" },
			],
		},
		{
			name: "authorName",
			type: "input",
			message: "Author name:",
			default: config.author.name,
			validate: function (name) {
				return name.trim() !== "";
			},
		},
		{
			name: "authorEmail",
			type: "input",
			message: "Author email:",
			default: config.author.email,
			validate: function (email) {
				// Regex mail check (return true if valid mail)
				return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
					email
				);
			},
		},
		{
			name: "authorWebSite",
			type: "input",
			message: "Author website:",
			default: config.author.url,
		},
		{
			name: "appLocation",
			type: "checkbox",
			message: "App location:",
			default: "ticketSidebar",
			choices: [
				{ name: "Ticket sidebar", value: "ticket_sidebar" },
				{ name: "New ticket sidebar", value: "new_ticket_sidebar" },
				{ name: "User", value: "user_sidebar" },
				{ name: "Organization", value: "organization_sidebar" },
				{ name: "Navbar", value: "nav_bar" },
				{ name: "Top bar", value: "top_bar" },
				{ name: "Ticket editor", value: "ticket_editor" },
				{ name: "Background", value: "background" },
				{ name: "Modal", value: "modal" },
			],
		},
	];
};

module.exports = getPrompts;
