/**
 * Safely decodes HTML entities in a string.
 */
const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
  '&apos;': "'",
};

// Pre-compiled regex for performance (avoids recompilation in loops).
const ENTITY_REGEX = /&[a-zA-Z0-9#]+;/g;
const NUMERIC_ENTITY_REGEX = /^&#\d+;$/;

/**
 * Decodes HTML entities in a string to their corresponding characters.
 * Handles named entities and numeric entities (decimal).
 *
 * @param text - The string containing HTML entities.
 * @returns The decoded string.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  return text.replace(ENTITY_REGEX, (match) => {
    if (ENTITIES[match]) return ENTITIES[match];

    // Handle numeric entities
    if (NUMERIC_ENTITY_REGEX.test(match)) {
      // Use fromCodePoint for Emoji/Astral support
      return String.fromCodePoint(Number.parseInt(match.slice(2, -1), 10));
    }

    return match;
  });
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param text - The text to slugify.
 * @returns The slugified string.
 *
 * @example
 * slugify("Hello World!") // -> "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

/**
 * Safely serializes an object to a JSON string suitable for embedding in HTML (e.g., JSON-LD).
 * Escapes characters that could be used for XSS attacks (<, >, &, U+2028, U+2029).
 *
 * @param data - The object to serialize.
 * @returns The escaped JSON string.
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/[\u2028\u2029<>&]/g, (c) => {
    switch (c) {
      case '<':
        return '\\u003c';
      case '>':
        return '\\u003e';
      case '&':
        return '\\u0026';
      case '\u2028':
        return '\\u2028';
      case '\u2029':
        return '\\u2029';
      default:
        return c;
    }
  });
}
