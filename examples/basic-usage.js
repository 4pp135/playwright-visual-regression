// examples/basic-usage.js
const { compareScreenshots } = require('../src/index');

/**
 * Basic example of visual regression testing
 * 
 * First run: Creates baseline image
 * Second run: Compares current screenshot with baseline
 */
async function runExample() {
  console.log('=== Visual Regression Testing Example ===\n');
  console.log('NOTE: On first run it creates baseline.');
  console.log('Run it again after making changes to test comparison.\n');

  try {
    const result = await compareScreenshots({
      url: 'https://example.com',
      name: 'homepage',
      threshold: 5,           // Allow up to 5% visual difference
      updateBaseline: false
    });

    if (result.message === 'Baseline created') {
      console.log('\nBaseline was created. Run this example again to test comparison.');
    } else {
      console.log('\nComparison finished!');
      console.log(`Result: ${result.passed ? 'PASSED' : 'FAILED'}`);
      console.log(`Difference: ${result.diffPercentage}%`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n=== Example finished ===');
}

runExample();
