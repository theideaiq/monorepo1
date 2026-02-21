import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from './cart-store';

describe('Cart Store', () => {
  // Reset store before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  const mockItem1 = {
    id: 'prod-1-var-1',
    productId: 'prod-1',
    title: 'Apple',
    price: 100,
    image: 'apple.jpg',
  };

  const mockItem2 = {
    id: 'prod-2-var-1',
    productId: 'prod-2',
    title: 'Banana',
    price: 50,
    image: 'banana.jpg',
  };

  it('should start with an empty cart', () => {
    const { items, total } = useCartStore.getState();
    expect(items).toEqual([]);
    expect(total).toBe(0);
  });

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem1);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toMatchObject({
      ...mockItem1,
      quantity: 1,
    });
    expect(useCartStore.getState().total).toBe(100);

    addItem(mockItem2);
    expect(useCartStore.getState().items).toHaveLength(2);
    expect(useCartStore.getState().total).toBe(150);
  });

  it('should increment quantity when adding an existing item', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem1);
    addItem(mockItem1);

    const { items, total } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
    expect(total).toBe(200);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(mockItem1);
    addItem(mockItem2);

    removeItem(mockItem1.id);

    const { items, total } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(mockItem2.id);
    expect(total).toBe(50);
  });

  it('should update total when quantity is modified', () => {
    const { addItem, updateQuantity } = useCartStore.getState();

    addItem(mockItem1); // total 100, qty 1

    updateQuantity(mockItem1.id, 3);

    const { items, total } = useCartStore.getState();
    expect(items[0].quantity).toBe(3);
    expect(total).toBe(300);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(mockItem1);
    addItem(mockItem2);

    clearCart();

    const { items, total } = useCartStore.getState();
    expect(items).toEqual([]);
    expect(total).toBe(0);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockItem1);

    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toHaveLength(1);
      expect(parsed.state.items[0].id).toBe(mockItem1.id);
      expect(parsed.state.total).toBe(100);
    }
  });
});
