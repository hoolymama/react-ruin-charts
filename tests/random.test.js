/**
 * Tests for the RandomNumber utility
 * This demonstrates that successive calls to methods of a RandomNumber instance
 * produce different values while maintaining deterministic sequences based on the seed.
 */

import RandomNumber from '../src/utils/random.js';

// Test 1: Basic random number generation
describe('RandomNumber - Basic Generation (CommonJS)', () => {
  test('should generate different numbers on successive calls', () => {
    const rng1 = RandomNumber('test-seed-1');
    const num1 = rng1.inRange();
    const num2 = rng1.inRange();
    const num3 = rng1.inRange();

    expect(num1).not.toBe(num2);
    expect(num2).not.toBe(num3);
    expect(num1).not.toBe(num3);
  });
});

// Test 2: Same seed produces same sequence
describe('RandomNumber - Deterministic Sequences (CommonJS)', () => {
  test('should produce the same sequence with the same seed', () => {
    const rngA = RandomNumber('test-seed-2');
    const rngB = RandomNumber('test-seed-2');

    const seqA = [rngA.inRange(), rngA.inRange(), rngA.inRange()];
    const seqB = [rngB.inRange(), rngB.inRange(), rngB.inRange()];

    expect(seqA[0]).toBe(seqB[0]);
    expect(seqA[1]).toBe(seqB[1]);
    expect(seqA[2]).toBe(seqB[2]);
  });
});

// Test 3: Different seeds produce different sequences
describe('RandomNumber - Different Seeds (CommonJS)', () => {
  test('should produce different sequences with different seeds', () => {
    const rngC = RandomNumber('test-seed-3');
    const rngD = RandomNumber('test-seed-4');

    const seqC = [rngC.inRange(), rngC.inRange(), rngC.inRange()];
    const seqD = [rngD.inRange(), rngD.inRange(), rngD.inRange()];

    // At least one value should be different
    const hasDifference =
      seqC[0] !== seqD[0] ||
      seqC[1] !== seqD[1] ||
      seqC[2] !== seqD[2];

    expect(hasDifference).toBe(true);
  });
});
