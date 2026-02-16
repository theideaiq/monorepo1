## 2025-06-03 - [Supabase Query Builder Mocking]
Discovery: Testing Supabase chained queries (e.g., `from().select().eq()`) in unit tests requires complex mocking of the query builder chain, which can be fragile if the call order changes.
Strategy: Use table-specific mock implementations (via `mockImplementation((table) => { ... })`) to return custom mock chains for each table interaction, ensuring tests target the correct query logic and remain readable.
