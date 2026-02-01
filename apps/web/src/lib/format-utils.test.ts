import { formatPrice } from '@repo/utils';
import { describe, expect, it } from 'vitest';

describe('Format Utils (@repo/utils)', () => {
  describe('formatPrice', () => {
    it('should format numbers with comma separators', () => {
      expect(formatPrice(1000)).toBe('1,000');
      expect(formatPrice(1000000)).toBe('1,000,000');
    });

    it('should handle small numbers', () => {
      expect(formatPrice(123)).toBe('123');
      expect(formatPrice(0)).toBe('0');
    });

    it('should remove decimal places (standard IQD)', () => {
      expect(formatPrice(100.5)).toBe('101'); // rounding
      expect(formatPrice(100.1)).toBe('100');
      expect(formatPrice(1234.56)).toBe('1,235');
    });

    it('should handle negative numbers', () => {
      expect(formatPrice(-1000)).toBe('-1,000');
    });

    it('should handle non-finite numbers', () => {
      expect(formatPrice(Number.NaN)).toBe('0');
      expect(formatPrice(Number.POSITIVE_INFINITY)).toBe('0');
    });
  });
});
