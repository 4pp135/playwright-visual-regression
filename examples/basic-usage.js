// examples/basic-usage.js
const { compareScreenshots } = require('../src/index');

/**
 * Basic example of visual regression testing
 * 
 * Usage:
 *   node examples/basic-usage.js              # Normal run (compare)
 *   node examples/basic-usage.js --update   # Update baseline
 *   node examples/basic-usage.js -u           # Same as --update
 */
async function runExample() {
  console.log('=== Visual Regression Testing Example ===\n');
  console.log('Tip: Use --update or -u to update baseline images\n');

  try {
    const result = await compareScreenshots({
      url: 'https://example.com',
      name: 'homepage',
      threshold: 5,
      updateBaseline: false
    });

    if (result.message === 'Baseline created') {
      console.log('\nBaseline was created. Run again to test comparison.');
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
