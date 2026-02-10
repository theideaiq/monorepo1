import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { WaylAdapter } from './wayl';

describe('WaylAdapter Webhook Verification', () => {
  const webhookSecret = 'test-secret';
  const adapter = new WaylAdapter({
    apiKey: 'test-key',
    webhookSecret,
  });

  const payload = {
    id: 'link_123',
    referenceId: 'ref_123',
    status: 'Complete',
    // Minimal required fields for Link type
    url: 'https://wayl.com',
    amount: 1000,
    currency: 'IQD',
    createdAt: '2023-01-01',
  };
  const rawBody = JSON.stringify(payload);

  it('should verify valid signature', async () => {
    const signature = createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    const event = await adapter.verifyWebhook(rawBody, signature);

    expect(event.id).toBe('link_123');
    expect(event.provider).toBe('wayl');
    expect(event.type).toBe('payment.success');
    expect(event.referenceId).toBe('ref_123');
  });

  it('should reject invalid signature', async () => {
    const signature = 'invalid-signature';
    await expect(adapter.verifyWebhook(rawBody, signature)).rejects.toThrow(
      'WaylAdapter: Invalid signature',
    );
  });

  it('should reject missing signature', async () => {
    await expect(adapter.verifyWebhook(rawBody, undefined)).rejects.toThrow(
      'WaylAdapter: Missing signature',
    );
  });

  it('should map failed payment status', async () => {
    const failedPayload = { ...payload, status: 'Failed' };
    const rawFailedBody = JSON.stringify(failedPayload);
    const signature = createHmac('sha256', webhookSecret)
      .update(rawFailedBody)
      .digest('hex');

    const event = await adapter.verifyWebhook(rawFailedBody, signature);
    expect(event.type).toBe('payment.failed');
  });
});
