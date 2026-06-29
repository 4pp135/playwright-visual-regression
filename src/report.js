// src/report.js
const fs = require('fs');
const path = require('path');

/**
 * Generates a simple HTML report for visual comparison
 * @param {Object} result - Comparison result
 * @param {string} name - Test name
 */
function generateReport(result, name) {
  const reportDir = path.join(__dirname, '..', 'report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Regression Report - ${name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .images { display: flex; gap: 20px; margin-top: 20px; }
    .image-box { text-align: center; }
    img { max-width: 100%; border: 1px solid #ddd; }
    .passed { color: green; }
    .failed { color: red; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual Regression Report</h1>
    <h2>${name}</h2>
    <p class="${result.passed ? 'passed' : 'failed'}">
      Status: ${result.passed ? 'PASSED' : 'FAILED'}
    </p>
    <p>Difference: ${result.diffPercentage || 'N/A'}%</p>
    
    <div class="images">
      <div class="image-box">
        <h3>Baseline</h3>
        <img src="../screenshots/${name}.png" alt="Baseline">
      </div>
      <div class="image-box">
        <h3>Current</h3>
        <img src="../screenshots/${name}.png" alt="Current">
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const reportPath = path.join(reportDir, `${name}-report.html`);
  fs.writeFileSync(reportPath, htmlContent);
  console.log(`Report generated: ${reportPath}`);

  return reportPath;
}

module.exports = { generateReport };
