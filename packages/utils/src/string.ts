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
// Updated regex to handle decimal and hex entities (case insensitive)
const NUMERIC_ENTITY_REGEX = /^&#([xX][0-9a-fA-F]+|\d+);$/;

/**
 * Decodes HTML entities in a string to their corresponding characters.
 * Handles named entities and numeric entities (decimal and hex).
 *
 * @param text - The string containing HTML entities.
 * @returns The decoded string.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  return text.replace(ENTITY_REGEX, (match) => {
    if (ENTITIES[match]) return ENTITIES[match];

    // Handle numeric entities
    const numericMatch = NUMERIC_ENTITY_REGEX.exec(match);
    if (numericMatch) {
      const code = numericMatch[1];
      let codePoint: number;

      if (code && (code.startsWith('x') || code.startsWith('X'))) {
        // Hexadecimal
        codePoint = Number.parseInt(code.slice(1), 16);
      } else {
        // Decimal
        codePoint = Number.parseInt(code || '', 10);
      }

      // Use fromCodePoint for Emoji/Astral support
      if (!Number.isNaN(codePoint)) {
        return String.fromCodePoint(codePoint);
      }
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
  if (!text) return ''; // Guard against null/undefined/empty

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}
