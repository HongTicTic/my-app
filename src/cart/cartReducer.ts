export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = { items: [] };

// ADD_ITEM carries no quantity at all: a new line always starts at 1.
export type CartAction =
    | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> }
    | { type: "REMOVE_ITEM"; id: number }
    | { type: "UPDATE_QUANTITY"; id: number; quantity: number }
    | { type: "INCREMENT"; id: number }
    | { type: "DECREMENT"; id: number };

// Pure: no fetch, no localStorage, no console, no mutation.
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.some((i) => i.id === action.item.id);
      return {
        items: exists
          ? state.items.map((i) =>
              i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY":
      // Zero (or less) removes the line, so a non-positive quantity never enters state
      return action.quantity <= 0
        ? { items: state.items.filter((i) => i.id !== action.id) }
        : {
            items: state.items.map((i) =>
              i.id === action.id ? { ...i, quantity: action.quantity } : i
            ),
          };
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      // Going from 1 to 0 removes the line
      return {
        items: state.items.flatMap((i) =>
          i.id !== action.id ? [i] : i.quantity <= 1 ? [] : [{ ...i, quantity: i.quantity - 1 }]
        ),
      };
    default:
      return state;
  }
}