import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Erreur sauvegarde panier', e);
    }
  }, [cartItems]);

  const addItem = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => String(i.productId) === String(product.id));
      if (existing) {
        return prev.map(i => i.productId === existing.productId ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxStock || 99) } : i );
      }

      const item = {
        id: product.id, // utiliser id produit comme identifiant
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || product.image,
        quantity: Math.max(1, Math.min(quantity, product.maxStock || 99)),
        brand: product.brand,
        inStock: product.inStock ?? true,
        maxStock: product.maxStock ?? 99,
        delivery: product.delivery ?? 'Livraison gratuite'
      };

      return [...prev, item];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxStock || 99)) } : item));
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
