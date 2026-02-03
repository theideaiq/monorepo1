## 2025-02-18 - Price Formatting Standardization
**Learning:** `Intl.NumberFormat` usage was scattered and instantiated inline in components, causing inconsistencies and potential performance issues. The existing `formatCurrency` utility enforced a currency symbol which didn't fit all UI contexts (like separated price and symbol styling).
**Action:** Created `formatPrice` in `@repo/utils` for raw number formatting using `en-IQ` locale standards (no decimals), allowing flexible UI composition while maintaining data formatting consistency.
