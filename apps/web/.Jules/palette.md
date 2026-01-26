## 2025-10-27 - Inconsistent Form Accessibility
**Learning:** Found that `Select` component lacked accessibility attributes (`aria-invalid`, `aria-describedby`) and required indicators present in `Input`.
**Action:** When working on form components, cross-reference `Input` implementation to ensure consistency in accessibility patterns.

## 2025-10-27 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found multiple icon-only buttons (Cart controls, Drawer close, Wishlist) completely missing accessible names, making them invisible or confusing to screen readers.
**Action:** Automatically audit all icon-based interactive elements (buttons with Lucide icons) for `aria-label` during component creation.
