# Palette's Journal

## 2025-02-23 - Accessibility in Dynamic Modals
**Learning:** React 19 `useId` is critical for linking dynamic modal titles with `aria-labelledby` without prop drilling IDs. Focus management (trapping or initial focus) in `useEffect` is essential but requires `requestAnimationFrame` to ensure the DOM is ready in some cases, especially with Framer Motion animations.
**Action:** Always check if a modal focuses its content on open. If using animations, verify focus timing.
