import { describe, it, expect } from 'vitest';
import { decodeHtmlEntities, slugify, safeJsonLdStringify } from './string';

describe('string utils', () => {
  describe('decodeHtmlEntities', () => {
    it('decodes basic entities', () => {
      expect(decodeHtmlEntities('&lt;div&gt;')).toBe('<div>');
      expect(decodeHtmlEntities('Ben &amp; Jerry&apos;s')).toBe("Ben & Jerry's");
    });

    it('decodes numeric entities', () => {
      expect(decodeHtmlEntities('&#169;')).toBe('©');
    });

    it('handles empty input', () => {
      expect(decodeHtmlEntities('')).toBe('');
    });
  });

  describe('slugify', () => {
    it('converts to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Café & Restaurant')).toBe('caf-restaurant');
    });
  });

  describe('safeJsonLdStringify', () => {
    it('serializes simple objects', () => {
      const obj = { key: 'value', num: 123 };
      expect(safeJsonLdStringify(obj)).toBe(JSON.stringify(obj));
    });

    it('escapes XSS vectors', () => {
      const dangerous = {
        name: '<script>alert(1)</script>',
        bio: 'Hello & Welcome',
      };
      const result = safeJsonLdStringify(dangerous);

      // Should be valid JSON
      expect(() => JSON.parse(result)).not.toThrow();

      // Check for escaping
      expect(result).not.toContain('<script>');
      expect(result).toContain('\\u003cscript\\u003e');
      expect(result).toContain('\\u0026'); // &
    });

    it('handles arrays', () => {
        const arr = ['<a>link</a>'];
        const result = safeJsonLdStringify(arr);
        expect(result).toContain('\\u003ca\\u003elink\\u003c/a\\u003e');
    });
  });
});
