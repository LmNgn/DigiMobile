export type Cart = {
    id?: number;
    userId: number;
    productId: number;
    quantity: number;
};

export type CartState = {
    carts: Cart[];
};

export type CartAction =
    | { type: "SET_CART"; payload: Cart[] }
    | { type: "ADD_TO_CART"; payload: Cart }
    | { type: "CLEAR_CART" }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "REMOVE_FROM_CART"; payload: number }; 

