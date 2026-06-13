import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // ✅ Add product or increase qty if already in cart
    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    // ✅ Remove product from cart
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // ✅ Update product quantity
    const updateQuantity = (id, qty) => {
        if (qty <= 0) {
            removeFromCart(id);
        } else {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, qty } : item
                )
            );
        }
    };

    // ✅ Clear all items
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// ✅ Custom hook
export const useCart = () => useContext(CartContext);
