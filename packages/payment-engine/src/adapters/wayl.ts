import { createHmac, timingSafeEqual } from 'node:crypto';
import { type Link, WaylClient } from '@repo/wayl';
import type {
  OrderData,
  PaymentProvider,
  PaymentSession,
  WebhookEvent,
} from '../types';

export class WaylAdapter implements PaymentProvider {
  public readonly name = 'wayl';
  public readonly client: WaylClient;
  private webhookSecret?: string;

  constructor(config: {
    apiKey: string;
    baseUrl?: string;
    webhookSecret?: string;
  }) {
    this.client = new WaylClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
    });
    this.webhookSecret = config.webhookSecret;
  }

  async createCheckoutSession(order: OrderData): Promise<PaymentSession> {
    const response = await this.client.links.create({
      referenceId: order.referenceId,
      total: order.amount,
      currency: order.currency,
      webhookUrl: order.webhookUrl,
      webhookSecret: order.webhookSecret || this.webhookSecret,
      redirectionUrl: order.redirectionUrl,
      // Mapping 'description' to 'customParameter' as an example, or could leave it out
      customParameter: order.description,
    });

    return {
      sessionId: response.data.id,
      url: response.data.url,
      provider: this.name,
      metadata: {
        referenceId: response.data.referenceId,
      },
    };
  }

  async verifyWebhook(
    rawBody: string,
    signature?: string,
  ): Promise<WebhookEvent> {
    if (!this.webhookSecret) {
      throw new Error('WaylAdapter: Webhook secret not configured');
    }

    if (!signature) {
      throw new Error('WaylAdapter: Missing signature');
    }

    const computedSignature = createHmac('sha256', this.webhookSecret)
      .update(rawBody)
      .digest('hex');

    const computedBuf = Buffer.from(computedSignature, 'utf8');
    const signatureBuf = Buffer.from(signature, 'utf8');

    if (
      computedBuf.length !== signatureBuf.length ||
      !timingSafeEqual(computedBuf, signatureBuf)
    ) {
      throw new Error('WaylAdapter: Invalid signature');
    }

    const data = JSON.parse(rawBody) as Link;

    let type: WebhookEvent['type'] = 'payment.failed';
    if (data.status === 'Complete' || data.status === 'Delivered') {
      type = 'payment.success';
    }

    return {
      id: data.id,
      provider: this.name,
      type,
      referenceId: data.referenceId,
      payload: data,
    };
  }
}
