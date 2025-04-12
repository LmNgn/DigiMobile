import { Cart, CartAction, CartState } from "../../../types/Cart";

export const initialState: CartState = {
    carts: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                carts: action.payload,
            };

        case "ADD_TO_CART": {
            const exists = state.carts.find(
                (item: Cart) => item.id === action.payload.id
            );

            if (exists) {
                // Nếu sản phẩm đã có trong giỏ → cập nhật số lượng (từ payload server trả về)
                return {
                    ...state,
                    carts: state.carts.map((item) =>
                        item.id === action.payload.id ? action.payload : item
                    ),
                };
            }

            // Nếu sản phẩm mới → thêm vào
            return {
                ...state,
                carts: [...state.carts, action.payload],
            };
        }

        case "UPDATE_QUANTITY":
            return {
                ...state,
                carts: state.carts
                    .map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: action.payload.quantity }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };

        case "CLEAR_CART":
            return { ...state, carts: [] };

        default:
            return state;
    }
}
