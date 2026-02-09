# Scribe's Journal

## 2025-02-18 - [Stubbed Providers in Factories]
Insight: The `PaymentFactory` contained undocumented "hybrid logic" that routed high-value transactions (> 500k IQD) to a stubbed provider (`ZainDirectAdapter`), causing unexpected runtime errors for developers testing with large amounts.
Rule: Any factory or abstraction layer that routes to a stubbed/unimplemented service must be explicitly documented in a README, with clear warnings about the conditions triggering the stub.
