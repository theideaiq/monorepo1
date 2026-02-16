import { describe, expect, it } from 'vitest';
import { formatCompactNumber, formatCurrency, formatDate } from './format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format USD correctly', () => {
      expect(formatCurrency(10.5)).toBe('$10.50');
      expect(formatCurrency(1000)).toBe('$1,000.00');
    });

    it('should format IQD correctly', () => {
      // IQD formatting might include non-breaking spaces
      const result = formatCurrency(50000, 'IQD');
      // Normalize space to check content
      expect(result.replace(/\u00A0/g, ' ')).toBe('IQD 50,000');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('formatDate', () => {
    it('should format Date object', () => {
      // Create a date using components to avoid timezone shift issues in tests
      // But new Date(y, m, d) creates local time.
      // The formatter uses local time by default.
      // So if we create local time 2023-01-15, it should print Jan 15, 2023.
      const date = new Date(2023, 0, 15); // Jan 15 2023
      expect(formatDate(date)).toBe('Jan 15, 2023');
    });

    it('should format date string', () => {
      // String parsing behavior is implementation dependent, but ISO strings are usually UTC.
      // If we use '2023-01-15T00:00:00', it is local.
      expect(formatDate('2023-01-15T00:00:00')).toBe('Jan 15, 2023');
    });

    it('should handle invalid date', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(new Date('invalid'))).toBe('');
    });
  });

  describe('formatCompactNumber', () => {
    it('should format compact numbers', () => {
      expect(formatCompactNumber(1500)).toBe('1.5K');
      expect(formatCompactNumber(1500000)).toBe('1.5M');
    });

    it('should handle small numbers', () => {
      expect(formatCompactNumber(123)).toBe('123');
    });

    it('should handle non-finite numbers', () => {
      expect(formatCompactNumber(NaN)).toBe('');
      expect(formatCompactNumber(Infinity)).toBe('');
    });
  });
});
