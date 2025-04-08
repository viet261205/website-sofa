import { CartState, CartAction } from "./types";

export const initialCartState: CartState = {
  cart: null,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: null };
    default:
      return state;
  }
}
