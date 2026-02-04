# Curator's Journal

## 2025-02-17 - Co-location of Unit Tests
Structure: Unit tests for shared packages should be co-located with their source code.
Rule: `packages/utils/src/foo.test.ts` should test `packages/utils/src/foo.ts` instead of tests living in consumer apps (e.g., `apps/web/src/lib/foo.test.ts`).
