# Signal's Journal

## 2025-02-19 - Product Schema & Fallback Logic
**Learning:** The `Product` structured data (JSON-LD) was missing from product detail pages, preventing search engines from displaying rich snippets (price, rating, stock). Additionally, the fallback/demo data in `services/products.ts` was unreachable because Supabase errors were caught and returned as `null` instead of throwing to the fallback `catch` block.
**Action:** Created `ProductJsonLd` component to inject schema. Updated `services/products.ts` to throw on error, enabling fallback data for offline/demo development and verification.
