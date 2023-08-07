# Leaflet Modern Plugin Template

![Leaflet Logo](https://leafletjs.com/docs/images/logo.png)

This repository is a GitHub template that serves as a base for creating modern plugins for Leaflet using Webpack and
ES5+. It provides all the necessary structure to develop and build custom plugins for the Leaflet mapping library.

## What is Leaflet?

Leaflet is an open-source JavaScript library widely used to create interactive maps on web pages. It is lightweight,
fast, and highly customizable, making it a popular choice for mapping projects.

Official website: [Leaflet](https://leafletjs.com/)

## Requirements

Before getting started, make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Getting Started

1. **Use this template**: Click on the "Use this template" button at the top of the page:

![](https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp)

2. **Use install script**: This script will setup the project for you

```bash
./start.sh
```

3. **Development**: Now you can start developing your custom plugin. The source files are located in the `src` folder,
   and you can edit the main file: `src/leaflet.<your plugin name>.js`.


4. **Start the webpack Watcher**: This will automatically rebuild your plugin when you make changes to the source files

```bash
npm run dev
```

Open the `index.html` in your browser

## Contribution

If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
We welcome contributions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
