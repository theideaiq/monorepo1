## 2024-05-24 - Expensive Instantiations in Render Loop
**Learning:** `Intl.NumberFormat` (and similar heavy constructors) inside React functional components create significant overhead, especially in list items like `ProductCard` which re-render frequently.
**Action:** Move formatters outside component scope or wrap in `useMemo`. Check `apps/web/src/components` for similar patterns.
