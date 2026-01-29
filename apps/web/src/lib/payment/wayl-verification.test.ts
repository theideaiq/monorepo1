import { createHmac } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { paymentFactory } from './config';

// Mocking webEnv because paymentFactory uses it
vi.mock('@repo/env/web', () => ({
  webEnv: {
    WAYL_SECRET_KEY: 'test-key',
    WAYL_WEBHOOK_SECRET: 'test-secret',
    ZAIN_SECRET_KEY: 'zain-key',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  },
}));

describe('Wayl Webhook Verification', () => {
  it('should verify a valid signature', async () => {
    const provider = paymentFactory.getProviderByName('wayl');
    const payload = JSON.stringify({
      id: 'test-id',
      status: 'Complete',
      referenceId: 'ref-123',
    });

    const signature = createHmac('sha256', 'test-secret')
      .update(payload)
      .digest('hex');

    const event = await provider.verifyWebhook(payload, signature);

    expect(event).toBeDefined();
    expect(event.type).toBe('payment.success');
    expect(event.id).toBe('test-id');
  });

  it('should throw on invalid signature', async () => {
    const provider = paymentFactory.getProviderByName('wayl');
    const payload = JSON.stringify({ status: 'Complete' });
    const signature = 'invalid-signature';

    await expect(provider.verifyWebhook(payload, signature)).rejects.toThrow(
      'Invalid webhook signature',
    );
  });

  it('should throw on missing signature', async () => {
    const provider = paymentFactory.getProviderByName('wayl');
    const payload = JSON.stringify({ status: 'Complete' });

    await expect(provider.verifyWebhook(payload, undefined)).rejects.toThrow(
      'Missing webhook signature',
    );
  });
});
