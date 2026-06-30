// src/index.js
const { takeScreenshot } = require('./screenshot');
const { compareImages } = require('./compare');
const { generateReport } = require('./report');
const path = require('path');
const fs = require('fs');

const BASELINE_DIR = path.join(__dirname, '..', 'screenshots', 'baseline');

// Check for update flag from command line
const shouldUpdateBaseline = process.argv.includes('--update') || process.argv.includes('-u');

/**
 * Main function for visual regression testing
 * @param {Object} options
 */
async function compareScreenshots({ url, name, threshold = 5, updateBaseline = false }) {
  // If --update or -u flag is passed from command line, force update
  const finalUpdateBaseline = updateBaseline || shouldUpdateBaseline;

  console.log(`\n[Visual Test] Starting: ${name}`);

  if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
  }

  const baselinePath = path.join(BASELINE_DIR, `${name}.png`);
  const currentPath = await takeScreenshot(url, name);

  if (!fs.existsSync(baselinePath) || finalUpdateBaseline) {
    fs.copyFileSync(currentPath, baselinePath);
    console.log('Baseline image created/updated.');
    return { name, passed: true, message: 'Baseline created' };
  }

  const result = compareImages(baselinePath, currentPath, threshold);
  generateReport(result, name, threshold);

  if (result.passed) {
    console.log(`\u2705 ${name} - PASSED (${result.diffPercentage}% difference)`);
  } else {
    console.log(`\u274c ${name} - FAILED (${result.diffPercentage}% difference)`);
  }

  return result;
}

module.exports = { compareScreenshots };
