# create-zendesk-app

This is a command-line interface (CLI) tool to generate a new Zendesk app project with customized configuration. The CLI prompts the user for various options, such as the project name, framework type, UI framework, version control system, author details, and app location, and then generates the project based on the selected options.

## Installation

You can install `create-zendesk-app` globally using `npm`:

```sh
npm install -g @lowqualityrkomi/create-zendesk-app
```

## Commands

`create-zendesk-app` has the following runnable commands:

-   `new` : Start a new project generation
-   `config` : Configure the command (like author informations)

## Create new project

You can run the command `create-zendesk-app new [directory]` in your terminal to start the new project generation. Follow the prompts to configure your new Zendesk app project.

### Configuration options

The CLI prompts the user for the following options:

-   Project name
-   Framework type
    -   Vanilla
    -   React
-   UI Framework
    -   None
    -   Bootstrap
    -   Zendesk Garden
    -       MUI Material
-   Version control system
    -   Git
    -   None
-   Author name
-   Author email
-   Author website
-   App location

## Command configuration

You can configure author informations using the command `create-zendesk-app config`. You will select `Author info` and insert author informations.

## Contributing

Contributions are welcome! Follow the [CONTRIBUTING guide line](https://github.com/lowqualityrkomi/create-zendesk-app/blob/main/CONTRIBUTING.md)
