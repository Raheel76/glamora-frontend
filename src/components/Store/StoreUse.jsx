import { create } from 'zustand';

const StoreUse = create((set) => ({
  cart: [],
  favorites: [],
  isCartOpen: false,
  isWishlistOpen: false,
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id
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
    cart: state.cart.filter((item) => item.id !== itemId)
  })),

  updateQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    ),
  })),
  
  toggleFavorite: (item) => set((state) => {
    const isFavorite = state.favorites.some((fav) => fav.id === item.id);
    return {
      favorites: isFavorite
        ? state.favorites.filter((fav) => fav.id !== item.id)
        : [...state.favorites, item]
    };
  }),
  
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),
}));

export default StoreUse;