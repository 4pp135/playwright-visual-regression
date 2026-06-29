// src/report.js
const fs = require('fs');
const path = require('path');

/**
 * Generates a simple HTML report
 */
function generateReport(result, name) {
  const reportDir = path.join(__dirname, '..', 'report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Visual Report - ${name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .passed { color: green; font-weight: bold; }
    .failed { color: red; font-weight: bold; }
    .images { display: flex; gap: 30px; margin-top: 20px; }
    img { max-width: 45%; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <h1>Visual Regression Report</h1>
  <h2>${name}</h2>
  <p class="${result.passed ? 'passed' : 'failed'}">Status: ${result.passed ? 'PASSED' : 'FAILED'}</p>
  <p>Difference: ${result.diffPercentage}%</p>
  
  <div class="images">
    <div>
      <h3>Baseline</h3>
      <img src="../screenshots/${name}.png" />
    </div>
    <div>
      <h3>Current</h3>
      <img src="../screenshots/${name}.png" />
    </div>
  </div>
</body>
</html>`;

  const reportPath = path.join(reportDir, `${name}-report.html`);
  fs.writeFileSync(reportPath, html);
  console.log(`Report saved: ${reportPath}`);
  return reportPath;
}

module.exports = { generateReport };
