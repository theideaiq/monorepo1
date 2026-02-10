## 2025-02-10 - Mocking Payment Adapters in Factory Tests
Discovery: Testing `PaymentFactory` without mocking adapters caused direct instantiation of `WaylClient` and `ZainDirectAdapter`, which risks making network calls or throwing errors if keys are missing in the test environment.
Strategy: Use `vi.mock()` to replace Adapter classes with stubs. This isolates the Factory logic (routing based on amount) from the Adapter implementation (handling API calls).
