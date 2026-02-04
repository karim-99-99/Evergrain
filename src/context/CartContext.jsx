import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Helper to save only essential cart data (id, quantity, price) to avoid localStorage quota issues
const safeSaveToStorage = (cartItems) => {
  try {
    // Only save minimal data: id, quantity, and price (no images, descriptions, etc.)
    const minimalCart = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity || 1,
      price: item.price || "0",
    }));
    localStorage.setItem("evergrain_cart", JSON.stringify(minimalCart));
  } catch (error) {
    // QuotaExceededError or other — silently fail, data stays in memory
    console.warn("Failed to save cart to localStorage:", error);
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("evergrain_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    safeSaveToStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Only save essential data: id, quantity, price
      return [
        ...prevItems,
        {
          id: product.id,
          quantity: 1,
          price: product.price || product.price_en || product.price_ar || "0",
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (parseFloat(String(item.price || "0").replace(/[^0-9.]/g, "")) || 0) *
          (item.quantity || 1),
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
