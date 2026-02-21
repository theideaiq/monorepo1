## 2025-02-28 - Cart Store State Shape Discrepancy
Discovery: The `cart-store.test.ts` tests were asserting that items were strings, while the actual `cart-store.ts` implementation stored complex objects. This caused the tests to be meaningless and invalid.
Strategy: Always verify the shape of the store state in tests against the actual TypeScript interface. When refactoring stores, tests must be updated to match the new state shape immediately.
