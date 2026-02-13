import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from './cart-store';

describe('Cart Store', () => {
  // Reset store before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should start with an empty cart', () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  const MOCK_ITEM_1 = {
    id: '1',
    productId: '1',
    title: 'Apple',
    price: 100,
    image: 'apple.jpg',
  };

  const MOCK_ITEM_2 = {
    id: '2',
    productId: '2',
    title: 'Banana',
    price: 200,
    image: 'banana.jpg',
  };

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem(MOCK_ITEM_1);
    expect(useCartStore.getState().items).toEqual([{ ...MOCK_ITEM_1, quantity: 1 }]);

    addItem(MOCK_ITEM_2);
    expect(useCartStore.getState().items).toEqual([
      { ...MOCK_ITEM_1, quantity: 1 },
      { ...MOCK_ITEM_2, quantity: 1 },
    ]);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(MOCK_ITEM_1);
    addItem(MOCK_ITEM_2);

    removeItem('1');
    expect(useCartStore.getState().items).toEqual([{ ...MOCK_ITEM_2, quantity: 1 }]);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(MOCK_ITEM_1);
    addItem(MOCK_ITEM_2);

    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should handle duplicate items correctly (increments quantity)', () => {
    const { addItem } = useCartStore.getState();

    addItem(MOCK_ITEM_1);
    addItem(MOCK_ITEM_1);
    expect(useCartStore.getState().items).toEqual([{ ...MOCK_ITEM_1, quantity: 2 }]);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(MOCK_ITEM_1);

    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toEqual([{ ...MOCK_ITEM_1, quantity: 1 }]);
    }
  });
});
