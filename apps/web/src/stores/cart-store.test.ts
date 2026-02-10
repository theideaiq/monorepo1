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

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem({
      id: 'apple',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    });
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].id).toBe('apple');

    addItem({
      id: 'banana',
      productId: 'p2',
      title: 'Banana',
      price: 50,
      image: '',
    });
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem({
      id: 'apple',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    });
    addItem({
      id: 'banana',
      productId: 'p2',
      title: 'Banana',
      price: 50,
      image: '',
    });

    removeItem('apple');
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].id).toBe('banana');
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem({
      id: 'apple',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    });
    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should handle quantity updates', () => {
    const { addItem } = useCartStore.getState();

    addItem({
      id: 'apple',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    });
    addItem({
      id: 'apple',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    });

    // Should increment quantity, not add duplicate item
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem({
      id: 'persistent',
      productId: 'p3',
      title: 'Persist',
      price: 10,
      image: '',
    });

    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items[0].id).toBe('persistent');
    }
  });
});
