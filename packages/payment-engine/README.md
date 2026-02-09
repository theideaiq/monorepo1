# Payment Engine

The **Payment Engine** package provides a unified abstraction layer for handling payments across multiple providers (Wayl, Zain Direct). It simplifies integration by offering a factory pattern that routes transactions based on business logic.

## 📦 Features

- **Provider Abstraction**: Common interface (`PaymentProvider`) for all gateways.
- **Smart Routing**: `PaymentFactory` automatically selects the best provider based on transaction amount.
- **Type Safety**: Full TypeScript support for orders, sessions, and webhooks.

## 🚀 Usage

### 1. Installation

This package is internal to the monorepo. Add it to your app's dependencies:

```json
"dependencies": {
  "@repo/payment-engine": "workspace:*"
}
```

### 2. Initialize a Provider

Use the `PaymentFactory` to get a provider instance. You can either let the factory decide based on the amount or request a specific provider.

```typescript
import { PaymentFactory } from '@repo/payment-engine';

const config = {
  waylKey: process.env.WAYL_SECRET_KEY,
  zainKey: process.env.ZAIN_SECRET_KEY,
  waylWebhookSecret: process.env.WAYL_WEBHOOK_SECRET,
};

// Option A: Smart Routing (Recommended)
// Uses Zain Direct for amounts > 500,000 IQD, otherwise Wayl.
const provider = PaymentFactory.getProvider(750000, config);

// Option B: Explicit Selection
const wayl = PaymentFactory.getProviderByName('wayl', config);
```

### 3. Create a Checkout Session

```typescript
const session = await provider.createCheckoutSession({
  referenceId: 'order_123',
  amount: 25000,
  currency: 'IQD',
  description: 'Premium Subscription',
  webhookUrl: 'https://api.myapp.com/webhooks/payment',
  redirectionUrl: 'https://myapp.com/success',
});

// Redirect user to payment page
redirect(session.url);
```

### 4. Verify Webhooks

Handle incoming webhook events securely.

```typescript
const event = await provider.verifyWebhook(requestBody, signatureHeader);

if (event.type === 'payment.success') {
  console.log(`Payment successful for order: ${event.referenceId}`);
}
```

## 🔌 Supported Providers

| Provider | Key | Status | Description |
| :--- | :--- | :--- | :--- |
| **Wayl** | `wayl` | ✅ Active | Default provider for standard transactions. |
| **Zain Direct** | `zain-direct` | 🚧 Stub | Placeholder for future integration (currently throws `Not Implemented`). |

## 🧠 Smart Routing Logic

The `PaymentFactory.getProvider(amount, ...)` method implements the following logic:

- **Amount > 500,000 IQD**: Routes to **Zain Direct** (to optimize fees/limits).
- **Amount <= 500,000 IQD**: Routes to **Wayl**.

> **Note**: Since Zain Direct is currently a stub, high-value transactions will throw an error until the implementation is complete.
