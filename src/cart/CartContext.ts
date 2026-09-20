import { createContext } from "react";
import type { Dispatch } from "react";
import type { CartAction, CartItem } from "./cartReducer";

export interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextValue | null>(null);
