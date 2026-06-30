// src/report.js
const fs = require('fs');
const path = require('path');

/**
 * Generates a professional HTML report for visual regression test
 */
function generateReport(result, name, threshold = 5) {
  const reportDir = path.join(__dirname, '..', 'report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  const diffDir = path.join(screenshotsDir, 'diffs');

  const baselineImg = `../screenshots/baseline/${name}.png`;
  const currentImg = `../screenshots/${name}.png`;
  const diffImg = `../screenshots/diffs/${name}.diff.png`;

  const statusClass = result.passed ? 'passed' : 'failed';
  const statusText = result.passed ? 'PASSED' : 'FAILED';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Regression Report - ${name}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 40px;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { color: #2c3e50; }
    .status {
      font-size: 1.5em;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 5px;
      display: inline-block;
      margin: 10px 0;
    }
    .passed { background-color: #d4edda; color: #155724; }
    .failed { background-color: #f8d7da; color: #721c24; }
    .info {
      background-color: #e9ecef;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .images {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      margin-top: 30px;
    }
    .image-container {
      flex: 1;
      min-width: 300px;
    }
    .image-container h3 {
      margin-bottom: 10px;
      color: #555;
    }
    img {
      max-width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .diff { border-color: #dc3545; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual Regression Report</h1>
    <h2>Test: ${name}</h2>
    
    <div class="status ${statusClass}">
      ${statusText}
    </div>
    
    <div class="info">
      <p><strong>Threshold:</strong> ${threshold}%</p>
      <p><strong>Difference:</strong> ${result.diffPercentage}%</p>
      <p><strong>Different Pixels:</strong> ${result.numDiffPixels || 'N/A'}</p>
    </div>

    <div class="images">
      <div class="image-container">
        <h3>Baseline</h3>
        <img src="${baselineImg}" alt="Baseline Image">
      </div>
      
      <div class="image-container">
        <h3>Current</h3>
        <img src="${currentImg}" alt="Current Image">
      </div>
      
      <div class="image-container">
        <h3>Diff</h3>
        <img src="${diffImg}" alt="Difference Image" class="diff">
      </div>
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
