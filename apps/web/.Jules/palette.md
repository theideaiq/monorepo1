## 2025-10-27 - Inconsistent Form Accessibility
**Learning:** Found that `Select` component lacked accessibility attributes (`aria-invalid`, `aria-describedby`) and required indicators present in `Input`.
**Action:** When working on form components, cross-reference `Input` implementation to ensure consistency in accessibility patterns.

## 2025-02-15 - Product Gallery Accessibility
**Learning:** Found that product thumbnails lacked keyboard accessibility and screen reader context ("View image X of Y"). The default `button` element provides focus but needs explicit `aria-label` and `aria-current` for gallery context.
**Action:** When implementing galleries or list selections, always ensure thumbnails are keyboard focusable and communicate state (current selection) to assistive technology.
