import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu sản phẩm trong giỏ hàng
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider quản lý trạng thái giỏ hàng
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  const addToCart = (product: CartItem) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += product.quantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, product]);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const getCartCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
