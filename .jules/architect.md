# Architect's Journal

## 2024-05-23 - Standardize Price Formatting
Smell: Inconsistent and repetitive use of `Intl.NumberFormat('en-IQ')` across multiple components, risking locale mismatch or configuration drift.
Standard: Use `formatPrice` from `@repo/utils` for displaying IQD prices. It enforces `en-IQ` locale and no decimal places, consistent with IQD usage. The currency symbol (IQD) should be handled separately by the UI for styling flexibility.
