/**
 * Tests for the RandomNumber utility
 * This demonstrates that successive calls to methods of a RandomNumber instance
 * produce different values while maintaining deterministic sequences based on the seed.
 */

import RandomNumber from '../src/utils/random.js';

// Test 1: Basic random number generation
describe('RandomNumber - Basic Generation', () => {
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
describe('RandomNumber - Deterministic Sequences', () => {
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
describe('RandomNumber - Different Seeds', () => {
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

// Test 4: Random integers
describe('RandomNumber - Integer Generation', () => {
  test('should generate different integers on successive calls', () => {
    const rng2 = RandomNumber('test-seed-5');
    const int1 = rng2.intInRange({ min: 1, max: 100 });
    const int2 = rng2.intInRange({ min: 1, max: 100 });
    const int3 = rng2.intInRange({ min: 1, max: 100 });

    expect(int1).not.toBe(int2);
    expect(int2).not.toBe(int3);
    expect(int1).not.toBe(int3);
  });
});

// Test 5: Random colors
describe('RandomNumber - Color Generation', () => {
  test('should generate different colors on successive calls', () => {
    const rng3 = RandomNumber('test-seed-6');
    const color1 = rng3.colorHex();
    const color2 = rng3.colorHex();
    const color3 = rng3.colorHex();

    expect(color1).not.toBe(color2);
    expect(color2).not.toBe(color3);
    expect(color1).not.toBe(color3);
  });
});

// Test 6: Custom ranges
describe('RandomNumber - Custom Ranges', () => {
  test('should generate different values with custom ranges', () => {
    const rng4 = RandomNumber('test-seed-7');
    const customRange1 = rng4.inRange({ min: 10, max: 20 });
    const customRange2 = rng4.inRange({ min: 10, max: 20 });

    expect(customRange1).not.toBe(customRange2);
    expect(customRange1).toBeGreaterThanOrEqual(10);
    expect(customRange1).toBeLessThanOrEqual(20);
    expect(customRange2).toBeGreaterThanOrEqual(10);
    expect(customRange2).toBeLessThanOrEqual(20);
  });
});

// Test 7: Custom color parameters
describe('RandomNumber - Custom Color Parameters', () => {
  test('should generate different blue colors on successive calls', () => {
    const rng5 = RandomNumber('test-seed-8');
    const blueColor1 = rng5.colorHex({ minHue: 180, maxHue: 240, minSaturation: 0.8 });
    const blueColor2 = rng5.colorHex({ minHue: 180, maxHue: 240, minSaturation: 0.8 });

    expect(blueColor1).not.toBe(blueColor2);
  });
});

// Test 8: Auto-generated seed
describe('RandomNumber - Auto-generated Seed', () => {
  test('should generate different sequences when no seed is provided', () => {
    // Small delay to ensure different time-based seeds
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Create two instances without providing a seed
    const rng1 = RandomNumber();

    // Wait a bit to ensure a different timestamp for the second instance
    return wait(5).then(() => {
      const rng2 = RandomNumber();

      const val1 = rng1.inRange();
      const val2 = rng2.inRange();

      // The values should be different since they're based on different timestamps
      expect(val1).not.toBe(val2);
    });
  });
}); 