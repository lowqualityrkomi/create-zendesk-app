const getSettingsPrompts = () => {
	return [
		{
			name: 'choice',
			type: 'list',
			message: 'What do you want to configure?',
			default: 'author',
			choices: [
				{
					name: 'Author info',
					value: 'author'
				}
			]
		}
	];
};

module.exports = getSettingsPrompts;
