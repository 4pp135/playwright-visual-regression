// src/screenshot.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

/**
 * Takes a screenshot of a webpage
 */
async function takeScreenshot(url, name) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const screenshotPath = path.join(screenshotsDir, `${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log(`Screenshot saved: ${screenshotPath}`);
    return screenshotPath;
  } finally {
    await browser.close();
  }
}

module.exports = { takeScreenshot };
