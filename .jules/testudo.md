## 2025-02-14 - Testing Supabase Utilities
Discovery: Supabase clients in this repo use a chained method pattern (`from().select().eq()`). Mocking this requires chained mock functions.
Strategy: Use `vi.fn()` for each method in the chain and set them up in `beforeEach` to return objects containing the next method in the chain. This allows testing of complex query construction and response handling.
