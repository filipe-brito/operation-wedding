import { createContext, useState, useContext } from "react";

// Context creation
const CartContext = createContext();

// Wrapper component. All children wrapped by this component have access to its data and functions
export function CartProvider({ children }) {
  // List of products in the cart
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Pegamos o que já tinha no carrinho (...prev) e adicionamos o novo
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (product) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Function to clear the cart
  const clearCart = () => setCart([]);

  // Calculating the total (using the reduce method of JS)
  const totalValue = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Customized hook to use the cart context
export function useCart() {
  return useContext(CartContext);
}
