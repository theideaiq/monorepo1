import { describe, it, expect } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats thousands correctly', () => {
    // Note: Node's Intl implementation for en-IQ uses comma as thousands separator
    expect(formatPrice(1250)).toBe('1,250');
    expect(formatPrice(50000)).toBe('50,000');
    expect(formatPrice(1000000)).toBe('1,000,000');
  });

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('0');
  });

  it('handles negative numbers', () => {
      // en-IQ uses minus sign
      expect(formatPrice(-1250)).toBe('-1,250');
  });

  it('handles invalid input', () => {
    expect(formatPrice(NaN)).toBe('');
    expect(formatPrice(Infinity)).toBe('');
    // @ts-expect-error Testing invalid type at runtime
    expect(formatPrice(null)).toBe('');
    // @ts-expect-error Testing invalid type at runtime
    expect(formatPrice(undefined)).toBe('');
  });
});
