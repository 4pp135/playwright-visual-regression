// src/compare.js
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

/**
 * Compares two images
 */
function compareImages(baselinePath, currentPath, threshold = 5) {
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
  const passed = diffPercentage <= threshold;

  const diffDir = path.join(path.dirname(currentPath), 'diffs');
  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }

  const diffPath = path.join(diffDir, path.basename(currentPath).replace('.png', '.diff.png'));
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return {
    passed,
    diffPercentage: diffPercentage.toFixed(2),
    numDiffPixels,
    diffPath
  };
}

module.exports = { compareImages };
