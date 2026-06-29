// src/screenshot.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

/**
 * Takes a screenshot of a webpage
 * @param {string} url - The URL to capture
 * @param {string} name - Name for the screenshot file
 * @returns {Promise<string>} Path to the saved screenshot
 */
async function takeScreenshot(url, name) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });

  // Ensure screenshots directory exists
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotsDir, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  await browser.close();
  console.log(`Screenshot saved to: ${screenshotPath}`);

  return screenshotPath;
}

module.exports = { takeScreenshot };
