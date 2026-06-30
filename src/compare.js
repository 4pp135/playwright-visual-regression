// src/compare.js
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

/**
 * Compares two PNG images and returns the result
 * @param {string} baselinePath - Path to the baseline image
 * @param {string} currentPath - Path to the current image
 * @param {number} threshold - Maximum allowed difference in percentage (e.g. 5 = 5%)
 * @returns {Object} Comparison result
 */
function compareImages(baselinePath, currentPath, threshold = 5) {
  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = baseline;
  const diff = new PNG({ width, height });

  // Compare images
  const numDiffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { 
      threshold: 0.1,      // Color difference threshold
      includeAA: true      // Include anti-aliasing in diff
    }
  );

  const totalPixels = width * height;
  const diffPercentage = (numDiffPixels / totalPixels) * 100;
  const passed = diffPercentage <= threshold;

  // Create diffs folder if it doesn't exist
  const diffDir = path.join(path.dirname(currentPath), 'diffs');
  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }

  // Save diff image
  const diffFilename = path.basename(currentPath).replace('.png', '.diff.png');
  const diffPath = path.join(diffDir, diffFilename);
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return {
    passed,
    diffPercentage: diffPercentage.toFixed(2),
    numDiffPixels,
    totalPixels,
    diffPath
  };
}

module.exports = { compareImages };
