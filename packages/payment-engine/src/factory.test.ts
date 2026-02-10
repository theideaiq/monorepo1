import { describe, it, expect, vi } from 'vitest';
import { PaymentFactory, type FactoryConfig } from './factory';

// Mock the adapters to prevent actual instantiation of network clients
vi.mock('./adapters/zain', () => {
  return {
    ZainDirectAdapter: class MockZainDirectAdapter {
      name = 'zain-direct';
      constructor(_config: any) {
        // stub constructor
      }
    }
  };
});

vi.mock('./adapters/wayl', () => {
  return {
    WaylAdapter: class MockWaylAdapter {
      name = 'wayl';
      client = {}; // mock client
      constructor(_config: any) {
        // stub constructor
      }
    }
  };
});

import { ZainDirectAdapter } from './adapters/zain';
import { WaylAdapter } from './adapters/wayl';

describe('PaymentFactory', () => {
  const config: FactoryConfig = {
    waylKey: 'wayl_secret',
    zainKey: 'zain_secret',
    waylBaseUrl: 'https://api.wayl.com',
    waylWebhookSecret: 'wayl_webhook_secret',
  };

  it('should return ZainDirectAdapter when amount is greater than 500,000', () => {
    const provider = PaymentFactory.getProvider(500001, config);
    expect(provider).toBeInstanceOf(ZainDirectAdapter);
    expect(provider.name).toBe('zain-direct');
  });

  it('should return WaylAdapter when amount is 500,000', () => {
    const provider = PaymentFactory.getProvider(500000, config);
    expect(provider).toBeInstanceOf(WaylAdapter);
    expect(provider.name).toBe('wayl');
  });

  it('should return WaylAdapter when amount is less than 500,000', () => {
    const provider = PaymentFactory.getProvider(1000, config);
    expect(provider).toBeInstanceOf(WaylAdapter);
    expect(provider.name).toBe('wayl');
  });

  it('should return ZainDirectAdapter when requesting by name "zain-direct"', () => {
    const provider = PaymentFactory.getProviderByName('zain-direct', config);
    expect(provider).toBeInstanceOf(ZainDirectAdapter);
  });

  it('should return WaylAdapter when requesting by unknown name', () => {
    const provider = PaymentFactory.getProviderByName('unknown', config);
    expect(provider).toBeInstanceOf(WaylAdapter);
  });
});
