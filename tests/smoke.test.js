/**
 * Smoke test to verify that the testing framework is working
 * This is a simple test that always passes
 */

describe('Smoke Test', () => {
  test('should pass', () => {
    console.log('Running smoke test...');

    // A simple assertion that always passes
    const result = true;

    console.log(`Smoke test result: ${result ? 'PASS' : 'FAIL'}`);

    expect(result).toBe(true);
  });
}); 