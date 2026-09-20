import { useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import type { CartAction, CartState } from "./cartReducer";
import { CartContext } from "./CartContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartProviderProps {
  children: ReactNode;
}

// localStorage can hold anything, so check the shape before trusting it
function isCartState(value: unknown): value is CartState {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { items?: unknown }).items)
  );
}

export default function CartProvider({ children }: CartProviderProps) {
  const [stored, setStored] = useLocalStorage<CartState>("cart", initialCartState);
  const state = isCartState(stored) ? stored : initialCartState;

  // Same pure reducer as before; the hook now owns storage and persistence
  const dispatch = useCallback<Dispatch<CartAction>>(
    (action) =>
      setStored((prev) =>
        cartReducer(isCartState(prev) ? prev : initialCartState, action)
      ),
    [setStored]
  );

  const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, totalQuantity, subtotal, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
}