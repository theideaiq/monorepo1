import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from './cart-store';

const mockItem = {
  id: '1',
  productId: 'p1',
  title: 'Apple',
  price: 100,
  image: 'apple.png',
};

const mockItem2 = {
  id: '2',
  productId: 'p2',
  title: 'Banana',
  price: 50,
  image: 'banana.png',
};

describe('Cart Store', () => {
  // Reset store before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should start with an empty cart', () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem);
    expect(useCartStore.getState().items).toEqual([{ ...mockItem, quantity: 1 }]);

    addItem(mockItem2);
    expect(useCartStore.getState().items).toEqual([
      { ...mockItem, quantity: 1 },
      { ...mockItem2, quantity: 1 },
    ]);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(mockItem);
    addItem(mockItem2);

    removeItem(mockItem.id);
    expect(useCartStore.getState().items).toEqual([{ ...mockItem2, quantity: 1 }]);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(mockItem);
    addItem(mockItem2);

    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should handle duplicate items correctly (increments quantity)', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem);
    addItem(mockItem);
    expect(useCartStore.getState().items).toEqual([
      { ...mockItem, quantity: 2 },
    ]);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockItem);

    // Persist middleware saves to localStorage synchronously in this mock environment usually,
    // or we might need to wait/trigger. Zustand persist usually works sync with localStorage.
    // The key in store definition is 'cart-storage-v2'
    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toEqual([{ ...mockItem, quantity: 1 }]);
    }
  });
});
