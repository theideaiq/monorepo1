## 2024-05-24 - Sitemap Synchronization
**Learning:** Found a discrepancy between `sitemap.ts` hardcoded routes and actual application routes (e.g., `/club` vs `/plus`). This causes crawling errors (404s).
**Action:** When creating new top-level pages or renaming routes, always check `sitemap.ts` and `robots.ts` to ensure they reflect the current site structure. Ideally, derive sitemap routes from a shared configuration like `@repo/config` if possible.

## 2025-03-03 - JSON-LD Security & Escaping
**Learning:** Using raw `JSON.stringify` inside `dangerouslySetInnerHTML` for JSON-LD exposes the application to XSS vulnerabilities if the data contains unescaped HTML characters (like `</script>`).
**Action:** Always use the `safeJsonLdStringify` utility from `@repo/utils` when injecting JSON-LD script tags to ensure proper escaping of special characters while maintaining valid JSON structure.
