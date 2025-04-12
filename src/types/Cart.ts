import { Product } from "./Product";
export type Cart = {
    id?: number;
    userId: number;
    product: Product;
    quantity: number;
};

export type CartState = {
    carts: Cart[];
};

export type CartAction =
    | { type: "SET_CART"; payload: Cart[] }
    | { type: "ADD_TO_CART"; payload: Cart }
    | { type: "CLEAR_CART" }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };
