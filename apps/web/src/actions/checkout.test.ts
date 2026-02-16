
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initiateCheckout } from './checkout';
import { redirect } from 'next/navigation';

// Mocks
const mocks = vi.hoisted(() => {
  return {
    getUser: vi.fn(),
    from: vi.fn(),
    redirect: vi.fn(),
    getProvider: vi.fn(),
  };
});

// Mock dependencies
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: mocks.getUser },
    from: mocks.from,
  }),
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

vi.mock('@/lib/payment/config', () => ({
  paymentFactory: {
    getProvider: mocks.getProvider,
  },
}));

describe('initiateCheckout', () => {
  const userId = 'user-123';
  const cartId = 'cart-456';
  const mockProduct = {
    id: 'prod-1',
    name: 'Test Product',
    price: 100,
    description: 'Test Desc',
  };
  const mockCartItems = [
    {
      quantity: 2,
      products: mockProduct,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Default User
    mocks.getUser.mockResolvedValue({ data: { user: { id: userId, email: 'test@example.com' } } });

    // Payment Provider Mock
    mocks.getProvider.mockReturnValue({
      name: 'stripe',
      createCheckoutSession: vi.fn().mockResolvedValue({
        sessionId: 'sess_abc',
        url: 'https://checkout.stripe.com/sess_abc',
        provider: 'stripe',
        metadata: {},
      }),
    });
  });

  it('should successfully initiate checkout when user owns the cart', async () => {
    // Arrange: Mock Supabase responses for Happy Path

    // 1. Carts query (Ownership check - TO BE IMPLEMENTED IN CODE)
    const mockCartsSingle = vi.fn().mockResolvedValue({ data: { id: cartId }, error: null });
    const mockCartsEq2 = vi.fn().mockReturnValue({ single: mockCartsSingle });
    const mockCartsEq1 = vi.fn().mockReturnValue({ eq: mockCartsEq2 });
    const mockCartsSelect = vi.fn().mockReturnValue({ eq: mockCartsEq1 });

    // 2. Cart Items query
    const mockItemsEq = vi.fn().mockResolvedValue({ data: mockCartItems, error: null });
    const mockItemsSelect = vi.fn().mockReturnValue({ eq: mockItemsEq });

    // 3. Orders insert
    const mockOrdersInsert = vi.fn().mockResolvedValue({ error: null });

    // Implement 'from' to return correct chain based on table name
    mocks.from.mockImplementation((table: string) => {
      if (table === 'carts') {
        return { select: mockCartsSelect };
      }
      if (table === 'cart_items') {
        return { select: mockItemsSelect };
      }
      if (table === 'orders') {
        return { insert: mockOrdersInsert };
      }
      return {};
    });

    // Act
    // We expect redirect to be called, which throws an error in Next.js (usually NEXT_REDIRECT)
    // But since we mocked redirect, it won't throw unless the mock implementation throws.
    // Our mock is a spy.

    await initiateCheckout(cartId);

    // Assert
    // Verify carts check was called (This expectation will FAIL until we implement the fix)
    // Wait, if I want to "Verify Failure" first, I should expect this call.
    // But currently the code DOES NOT call 'carts'.
    // So if I add expect(mocks.from).toHaveBeenCalledWith('carts'), it will fail.
    // But wait, the function will proceed to 'cart_items' and succeed.

    expect(mocks.from).toHaveBeenCalledWith('cart_items');
    expect(mocks.from).toHaveBeenCalledWith('orders');
    expect(mocks.redirect).toHaveBeenCalledWith('https://checkout.stripe.com/sess_abc');
  });

  it('should throw "Unauthorized" when user does not own the cart', async () => {
    // Arrange: Mock Carts query to return null (not found/not owned)

    const mockCartsSingle = vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const mockCartsEq2 = vi.fn().mockReturnValue({ single: mockCartsSingle });
    const mockCartsEq1 = vi.fn().mockReturnValue({ eq: mockCartsEq2 });
    const mockCartsSelect = vi.fn().mockReturnValue({ eq: mockCartsEq1 });

    // For cart_items (if it gets there)
    const mockItemsEq = vi.fn().mockResolvedValue({ data: mockCartItems, error: null });
    const mockItemsSelect = vi.fn().mockReturnValue({ eq: mockItemsEq });

    mocks.from.mockImplementation((table: string) => {
      if (table === 'carts') {
        return { select: mockCartsSelect };
      }
      if (table === 'cart_items') {
        return { select: mockItemsSelect };
      }
      return {};
    });

    // Act & Assert
    // Since current implementation DOES NOT check 'carts', it will proceed to 'cart_items' and SUCCEED.
    // So this test expectation (rejects.toThrow) will FAIL.
    // This confirms the vulnerability.
    await expect(initiateCheckout(cartId)).rejects.toThrow(/Unauthorized|Cart not found/);
  });
});
