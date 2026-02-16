import { describe, expect, it } from 'vitest';
import { safeJsonLdStringify } from './string';

describe('safeJsonLdStringify', () => {
  it('should escape < characters to prevent XSS', () => {
    const malicious = { name: '</script><script>alert(1)</script>' };
    const safe = safeJsonLdStringify(malicious);

    // Check that < is replaced by \u003c
    expect(safe).toContain('\\u003c/script>');
    expect(safe).not.toContain('</script>');
  });

  it('should correctly stringify normal objects', () => {
    const data = { name: 'Test', age: 123 };
    const json = safeJsonLdStringify(data);
    expect(JSON.parse(json)).toEqual(data);
  });

  it('should be parseable back to original object with special chars', () => {
    const data = { name: '<b>Bold</b>' };
    const safe = safeJsonLdStringify(data);

    // It is safe in script tag
    expect(safe).toContain('\\u003cb>Bold\\u003c/b>');

    // But parses back to original
    expect(JSON.parse(safe)).toEqual(data);
  });
});
