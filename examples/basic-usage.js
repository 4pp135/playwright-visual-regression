// examples/basic-usage.js
const { compareScreenshots } = require('../src/index');

async function runExample() {
  console.log('Running basic visual regression example...');

  try {
    const result = await compareScreenshots({
      url: 'https://example.com',
      name: 'example-homepage',
      threshold: 0.05,        // 5% difference allowed
      updateBaseline: false
    });

    console.log('Comparison completed!');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error running example:', error);
  }
}

runExample();
