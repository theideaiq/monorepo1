## 2024-05-22 - Stretched Link Pattern for Cards
**Learning:** Cards wrapping content in a `Link` often cause invalid HTML when they contain interactive buttons (`<button>` inside `<a>`).
**Action:** Use the "Stretched Link" pattern: make the card `relative`, place the `Link` inside as `absolute inset-0 z-10`, and elevate interactive children with `z-20 relative`.
