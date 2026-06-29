// examples/basic-usage.js
const { compareScreenshots } = require('../src/index');

/**
 * Basic example of visual regression testing
 */
async function runExample() {
  console.log('=== Running Visual Regression Example ===\n');

  try {
    // Example 1: Test homepage
    const result1 = await compareScreenshots({
      url: 'https://example.com',
      name: 'homepage',
      threshold: 5,           // Allow up to 5% difference
      updateBaseline: false
    });

    console.log('Homepage test completed.\n');

    // You can add more tests here
    // const result2 = await compareScreenshots({...});

    console.log('=== All tests completed ===');
  } catch (error) {
    console.error('Error during testing:', error);
  }
}

runExample();
