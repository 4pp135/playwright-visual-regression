# playwright-visual-regression

A lightweight and beginner-friendly visual regression testing tool built with Playwright.

## Overview

`playwright-visual-regression` is a simple yet powerful tool designed to help developers and QA engineers detect visual changes in web applications. By automatically comparing screenshots before and after code changes, it helps catch UI regressions early in the development process.

This project was created to make visual regression testing more accessible without requiring complex setups or heavy dependencies.

## Features

- Easy screenshot capture using Playwright
- Automatic comparison between baseline and current screenshots
- Visual diff generation with highlighted differences
- Configurable difference threshold
- Simple and clean HTML report generation
- Easy baseline update with `--update` flag
- Support for responsive testing (desktop & mobile)

## Why this project?

Many teams avoid visual regression testing because existing tools are either too complex or too expensive. This project offers a lightweight, open-source alternative focused on simplicity and real-world usability.

It is especially useful for:
- Frontend developers who want to prevent unexpected UI breaks
- QA teams looking for easy visual regression testing
- Open source projects that need reliable visual testing

## Installation

```bash
npm install playwright-visual-regression
```

Or clone the repository:

```bash
git clone https://github.com/4pp135/playwright-visual-regression.git
cd playwright-visual-regression
npm install
npx playwright install
```

## Usage

### Using as a library

```js
const { compareScreenshots } = require('playwright-visual-regression');

await compareScreenshots({
  url: 'https://example.com',
  name: 'homepage',
  threshold: 5,           // Allow up to 5% visual difference
  updateBaseline: false
});
```

### Using from command line (Recommended)

```bash
# Normal run (compare images)
node examples/basic-usage.js

# Update baseline images
node examples/basic-usage.js --update

# Same as --update
node examples/basic-usage.js -u
```

## Project Goals

- Make visual regression testing simple and accessible
- Provide clear and useful reports when differences are found
- Be easy to integrate into existing Playwright projects
- Stay lightweight and beginner-friendly

## Requirements

- Node.js 18 or higher
- Playwright

## Project Structure

```
playwright-visual-regression/
├── README.md
├── package.json
├── src/
│   ├── index.js
│   ├── screenshot.js
│   ├── compare.js
│   └── report.js
├── examples/
│   └── basic-usage.js
└── LICENSE
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Related to TestingBot

This project works great with cloud testing platforms like TestingBot, allowing you to run visual regression tests across multiple real browsers and devices.
