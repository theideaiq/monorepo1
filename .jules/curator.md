## 2024-05-23 - Co-location of Package Tests

Structure: Tests for shared packages (like `@repo/utils`, `@repo/ui`) must be located within the package itself, not in the consuming application (like `apps/web`).

Rule: `packages/*/src/*.test.ts` should exist alongside `packages/*/src/*.ts`. Consuming apps should treat packages as black boxes and only test their own integration, not the package's internal logic.
