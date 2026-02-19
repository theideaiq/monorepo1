# Payment Engine Package

This package handles payment orchestration using a Factory pattern to select the appropriate payment provider (Wayl or ZainDirect).

## Contents

- **Adapters**:
  - `WaylAdapter`: Integrates with the Wayl payment gateway (Active).
  - `ZainDirectAdapter`: Stub for Zain Cash direct integration (Not Implemented).
- **Factory**: Logic to select the best provider based on transaction criteria.

## Usage

### 1. Automatic Selection (Hybrid Logic)

The factory automatically selects the provider based on the transaction amount:
- **Amount > 500,000 IQD**: Prefers `ZainDirect` (currently stubbed).
- **Otherwise**: Defaults to `Wayl`.

```ts
import { PaymentFactory } from '@repo/payment-engine';

const provider = PaymentFactory.getProvider(600000, {
  waylKey: process.env.WAYL_SECRET_KEY,
  zainKey: process.env.ZAIN_SECRET_KEY,
});
// Returns ZainDirectAdapter (throws Error until implemented)
```

### 2. Explicit Selection

Force a specific provider by name. Useful when a service is strictly bound to one gateway.

```ts
import { PaymentFactory } from '@repo/payment-engine';

const provider = PaymentFactory.getProviderByName('wayl', {
  waylKey: process.env.WAYL_SECRET_KEY,
  zainKey: process.env.ZAIN_SECRET_KEY,
  waylWebhookSecret: process.env.WAYL_WEBHOOK_SECRET,
});

const session = await provider.createCheckoutSession({
  referenceId: 'order_123',
  amount: 5000,
  currency: 'IQD',
  description: 'Premium Plan',
  webhookUrl: 'https://api.example.com/webhooks/wayl',
});
```

## Configuration

The factory requires a `FactoryConfig` object:

```ts
interface FactoryConfig {
  waylKey: string;
  zainKey: string;
  waylBaseUrl?: string;       // Optional: Override Wayl API URL
  waylWebhookSecret?: string; // Optional: For webhook verification
}
```

## Status

| Provider | Status | Notes |
| :--- | :--- | :--- |
| **Wayl** | ✅ Active | Fully implemented via `@repo/wayl`. |
| **Zain Direct** | 🚧 Planned | Currently throws `Not Implemented`. |
