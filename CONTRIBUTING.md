# Welcome to create-zendesk-app contributing guide

Thank you for investing your time in contributing to our project! Any contributions are welcomes.

In this guide you will get an overview of the contribution.

In [Next  updates](#next-updates) You can find a list of updates you can contribute to!

## Templates

In the folder `templates` you can find all the templates. Following you can see the folder tree:

```
templates
└─ [framework-name]
   └─ [ui-library]

```

When adding a new framework, it is essential to include templates for all UI libraries. Similarly, when adding a new UI library, it is crucial to include it for all existing frameworks.

### UI Templates

To add a new template:

-   move into `templates`
-   move into the framework folder
-   create a new folder with the name of the ui library
-   paste inside the template (without the `node_modules` folder).
-   open the file `lib/prompts.js`
-   add the new ui in the `choices` (the value must have the same name of the new template folder)

```
{
	name: 'ui',
	type: 'list',
	message: 'UI Framework:',
	default: 'none',
	choices: [
		{ name: 'None', value: 'none' },
		{ name: 'Bootstrap', value: 'bootstrap' },
		{ name: 'Zendesk Garden', value: 'garden' }
	]
}
```

### Frameworks

To add a new framework:

-   move into `templates`
-   create a new folder with the name of the framework
-   add all the ui templates following the guide [UI Templates](#ui-templates)
-   open the file `lib/prompts.js`
-   add the new framework in the `choices` (the value must have the same name of the new framework folder)

```
{
	name: 'frameworkType',
	type: 'list',
	message: 'Framework type:',
	default: 'vanilla',
	choices: [
		{ name: 'Vanilla', value: 'vanilla' },
		{ name: 'React', value: 'react' }
	]
}
```

## Next updates

- Add command `settings` to setup the author informations
- Add NuxtJS framework
