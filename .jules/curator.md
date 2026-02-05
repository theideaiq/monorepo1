## 2025-02-18 - Co-location of Utility Tests
Structure: Unit tests for shared packages (like `@repo/utils`) must be co-located with the source code they test, rather than residing in consuming applications (like `apps/web`).
Rule: Tests for a package must live within that package's directory structure (e.g., `packages/utils/src/string.test.ts` next to `string.ts`) and be executable via that package's `test` script.
