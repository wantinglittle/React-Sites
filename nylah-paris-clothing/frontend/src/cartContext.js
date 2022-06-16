import { createContext, useState } from "react";
import Axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartSize, setCartSize] = useState(0);
  const token = localStorage.getItem("authToken");

  const updateCartSize = () => {
    if (localStorage.getItem("authToken")) {
      try {
        Axios.get(`/api/cart`, { params: { token: token } }).then((res) => {
          setCartSize(res.data[0].cartItems.length);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cartSize, updateCartSize }}>
      {children}
    </CartContext.Provider>
  );
}
