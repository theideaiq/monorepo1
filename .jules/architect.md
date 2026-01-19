## 2024-03-24 - [Enforce Constants for Roles and Limits]
Smell: Magic strings like 'admin' and magic numbers like 60000 in logic.
Standard: Use `ROLES` constant from `@/lib/constants` for role checks. Use `WINDOW_SIZE_MS` from `@/lib/rate-limit` (or domain constants) for time-based logic.
