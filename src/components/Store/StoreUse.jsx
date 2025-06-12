import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const StoreUse = create(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      isCartOpen: false,
      isWishlistOpen: false,
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null, cart: [], favorites: [] }),

      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);

        if (existingItem) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                : cartItem
            ),
          };
        }

        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }),

      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item._id !== itemId)
      })),

      updateQuantity: (itemId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item._id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (item) => set((state) => {
        const isFavorite = state.favorites.some((fav) => fav._id === item._id);
        return {
          favorites: isFavorite
            ? state.favorites.filter((fav) => fav._id !== item._id)
            : [...state.favorites, item]
        };
      }),

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => {
          return sum + item.price * (item.quantity || 1);
        }, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + (item.quantity || 1), 0);
      },
    }),
    {
      name: 'fashion-store',
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        user: state.user,
      }),
    }
  )
);

export default StoreUse;