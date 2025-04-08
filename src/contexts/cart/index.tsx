// context/cart/CartContext.tsx
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { CartState, CartAction, Cart, Product } from "./types";
import { cartReducer, initialCartState } from "./cartReducer";
import { useUser } from "../userContext";
import { create, getList, update } from "../../providers";

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
} | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const { data, refetch } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getList({ resource: `carts?userId=${user?.id}` }),
    enabled: !!user?.id,
  });

  const cartUser: Cart | null = data ? data[0] : null;
  const cartId = cartUser?.id;

  const { mutate: updateCart } = useMutation({
    mutationFn: (values: any) =>
      update({ resource: "carts", values, id: cartId }),
    onSuccess: (data) => {
      message.success("Cập nhật giỏ hàng thành công");
      dispatch({ type: "SET_CART", payload: data });
    },
  });

  const { mutate: createCart } = useMutation({
    mutationFn: (values: any) => create({ resource: "carts", values }),
    onSuccess: (data) => {
      message.success("Tạo giỏ hàng thành công");
      dispatch({ type: "SET_CART", payload: data });
    },
  });
  useEffect(() => {
    if (user && cartUser) {
      dispatch({ type: "SET_CART", payload: cartUser });
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [user, cartUser]);

  const addToCart = (product: Product) => {
    if (!user) return;

    const handleUpdateCart = (cart: Cart) => {
      const existingIndex = cart.products.findIndex((p) => p.id === product.id);
      let newProducts: Product[] = [];

      if (existingIndex > -1) {
        newProducts = cart.products.map((p, idx) =>
          idx === existingIndex ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        newProducts = [...cart.products, { ...product, quantity: 1 }];
      }

      updateCart({
        userId: user.id,
        products: newProducts,
      });
    };

    // Trường hợp 1: đã có cart → cập nhật
    if (cartUser && cartId) {
      handleUpdateCart(cartUser);
    } else {
      // Trường hợp 2: chưa có → tạo mới cart và sau đó cập nhật lại local state
      const newCart = {
        userId: user.id,
        products: [{ ...product, quantity: 1 }],
      };

      createCart(newCart, {
        onSuccess: async (data: Cart) => {
          // Sau khi tạo xong → refetch để lấy cartId mới
          await refetch();
          dispatch({ type: "SET_CART", payload: data });
        },
      });
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
