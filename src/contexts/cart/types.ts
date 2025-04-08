// context/cart/types.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  quantity: number;
};

export type Cart = {
  id: number;
  userId: string;
  products: Product[];
};

export type CartState = {
  cart: Cart | null;
};

export type CartAction =
  | { type: "SET_CART"; payload: Cart }
  | { type: "CLEAR_CART" };
