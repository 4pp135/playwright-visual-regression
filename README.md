# 🎭 Playwright Visual Regression

> A lightweight, beginner-friendly visual regression testing tool built on top of Playwright.

**playwright-visual-regression** helps developers and QA engineers automatically detect unexpected visual changes in web applications by comparing screenshots between test runs. Designed to be simple, fast, and easy to understand, it's an approachable alternative to more complex visual testing solutions.

---

# Overview

Modern web applications change constantly. Even a small CSS modification can accidentally break layouts, spacing, colors, or UI components without affecting functional tests.

**playwright-visual-regression** makes visual testing straightforward by leveraging the power of Playwright's screenshot capabilities. Instead of manually inspecting every UI change, the tool compares screenshots and reports visual differences automatically.

Whether you're building personal projects, enterprise applications, or testing websites in cloud environments like **TestingBot**, this project helps increase confidence before deploying changes.

---

# Why this project?

Visual regression testing is becoming an essential part of modern software development, but many existing solutions are either:

- difficult to configure
- expensive
- dependent on external services
- overwhelming for beginners

This project was created to provide a **lightweight**, **open source**, and **easy-to-understand** alternative that developers can integrate into their workflow within minutes.

The goal is not to replace enterprise platforms, but to offer a practical solution that anyone can learn and extend.

---

# ✨ Features

- 📸 Automatic screenshot comparison
- ⚡ Powered by Playwright
- 🧩 Simple configuration
- 🚀 Fast execution
- 🖥️ Cross-browser compatible
- 🔍 Detects unexpected UI changes
- 📁 Organized snapshot management
- ☁️ Works well with cloud testing platforms such as **TestingBot**
- ❤️ Beginner-friendly documentation
- 🌍 Fully open source

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/4pp135/playwright-visual-regression.git
```

Move into the project directory:

```bash
cd playwright-visual-regression
```

Install dependencies:

```bash
npm install
```

or

```bash
pnpm install
```

---

# 🚀 Usage

Run your visual regression tests with Playwright:

```javascript
import { test, expect } from "@playwright/test";

test("Homepage visual test", async ({ page }) => {
  await page.goto("https://example.com");

  await expect(page).toHaveScreenshot("homepage.png");
});
```

Execute the tests:

```bash
npx playwright test
```

If the UI changes unexpectedly, Playwright will highlight the visual differences, making them easy to review before deployment.

---

# 🎯 Project Goals

This project aims to:

- Make visual regression testing accessible to everyone.
- Keep configuration simple and intuitive.
- Reduce false positives while maintaining reliable comparisons.
- Provide a solid starting point for developers learning Playwright.
- Encourage community contributions and continuous improvements.
- Work seamlessly in local environments and cloud testing platforms like **TestingBot**.

---

# ✅ Requirements

- Node.js 18 or newer
- npm or pnpm
- Playwright

Install Playwright if needed:

```bash
npx playwright install
```

---

# 📁 Project Structure

```text
playwright-visual-regression/
│
├── tests/
│   └── visual/
│
├── snapshots/
│
├── playwright.config.ts
│
├── package.json
│
├── README.md
│
└── LICENSE
```

---

# 🤝 Contributing

Contributions are always welcome.

Whether you've found a bug, have an idea for a new feature, or want to improve the documentation, your help is appreciated.

Getting started is easy:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your work.
5. Open a Pull Request.

Please keep contributions focused, well-documented, and aligned with the project's goal of remaining lightweight and beginner-friendly.

---

# 📄 License

This project is released under the **MIT License**.

Feel free to use, modify, and distribute it according to the terms of the license.

---

<div align="center">

### Built with ❤️ using Playwright

**Simple. Lightweight. Open Source.**

If this project helps you, consider giving it a ⭐ to support its development.

</div>
