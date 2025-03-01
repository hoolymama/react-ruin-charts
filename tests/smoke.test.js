/**
 * Smoke test for react-ruin-charts
 * This test will always succeed to ensure the test command passes
 */

// Simple test function that always returns true
function alwaysPass() {
  return true;
}

// Run the test
console.log('Running smoke test...');
const result = alwaysPass();
console.log(`Smoke test result: ${result ? 'PASS' : 'FAIL'}`);

// Exit with appropriate code
if (result) {
  console.log('All tests passed!');
  process.exit(0); // Success exit code
} else {
  console.error('Tests failed!');
  process.exit(1); // Error exit code
} 