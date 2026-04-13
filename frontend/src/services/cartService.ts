import api from './api';
import type { Product } from './productService';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export const cartService = {
  getCart: async (): Promise<CartItem[]> => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId: number, quantity: number = 1): Promise<CartItem> => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  updateQuantity: async (cartItemId: number, quantity: number): Promise<CartItem> => {
    const response = await api.put(`/cart/${cartItemId}?quantity=${quantity}`);
    return response.data;
  },

  removeItem: async (cartItemId: number): Promise<void> => {
    await api.delete(`/cart/${cartItemId}`);
  },

  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
};
