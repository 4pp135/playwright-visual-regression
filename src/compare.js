// src/compare.js
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

/**
 * Compares two images and returns the number of different pixels
 * @param {string} baselinePath - Path to baseline image
 * @param {string} currentPath - Path to current image
 * @param {number} threshold - Difference threshold (0-1)
 * @returns {Object} Comparison result
 */
function compareImages(baselinePath, currentPath, threshold = 0.1) {
  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = baseline;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  const diffPercentage = (numDiffPixels / (width * height)) * 100;
  const passed = diffPercentage <= (threshold * 100);

  // Save diff image
  const diffPath = path.join(path.dirname(currentPath), `${path.basename(currentPath, '.png')}.diff.png`);
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return {
    passed,
    diffPercentage: diffPercentage.toFixed(2),
    numDiffPixels,
    diffPath
  };
}

module.exports = { compareImages };
