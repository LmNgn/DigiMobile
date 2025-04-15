import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useUser } from "./userContext";
import { create, getList, update, deleteOne } from "../providers"; // đã thêm 'deleteOne'
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { cartReducer, initialState } from "../reducer/cartReducer";
import { Cart, CartAction, CartState } from "../../../types/Cart";
import { Product } from "../../../types/Product";

// Kiểu dữ liệu cho Context
type CartContextType = {
    state: CartState;
    addToCart: (product: Product) => void;
    updateQuantity: (id: number, quantity: number) => void;
    dispatch: React.Dispatch<CartAction>;
    clearUserCart: () => void; // Thêm phương thức xoá giỏ hàng
    deleteCart: (id: number) => void; // Thêm phương thức xoá giỏ hàng
};

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook sử dụng Context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

// Provider chính
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { user } = useUser();

    // Lấy giỏ hàng theo user
    const { data: userCart } = useQuery({
        queryKey: ["carts"],
        queryFn: () => getList({ resource: `carts?userId=${user?.id}` }),
        enabled: !!user?.id,
    });

    useEffect(() => {
        if (user && userCart) {
            dispatch({ type: "SET_CART", payload: userCart });
        } else {
            dispatch({ type: "CLEAR_CART" });
        }
    }, [user, userCart]);

    // Mutation thêm/cập nhật giỏ hàng
    const { mutate } = useMutation({
        mutationFn: (values: any) =>
            values.id
                ? update({ resource: "carts", values: values.cart, id: values.id })
                : create({ resource: "carts", values: values.cart }),
        onSuccess: (data) => {
            message.success("Cập nhật giỏ hàng thành công");
            dispatch({ type: "ADD_TO_CART", payload: data });
        },
    });

    // Mutation xoá sản phẩm
    const { mutate: deleteCart } = useMutation({
        mutationFn: (id: number) => deleteOne({ resource: "carts", id }), // Gửi yêu cầu xóa sản phẩm
        onSuccess: (_, id) => {
            dispatch({ type: "REMOVE_FROM_CART", payload: id });
        },
    });

    // Xoá thông tin giỏ hàng
    const clearUserCart = async () => {
        if (!user || !userCart) return;

        // Xóa tất cả các sản phẩm trong giỏ hàng của người dùng
        dispatch({ type: "CLEAR_CART" });

        // Sử dụng Promise.all để đợi tất cả các yêu cầu xóa hoàn tất
        await Promise.all(
            userCart.map((cartItem: any) => deleteCart(cartItem.id)) // Gửi yêu cầu xóa từng sản phẩm trong giỏ hàng
        );

        // Sau khi tất cả các sản phẩm đã được xóa, có thể thực hiện các thao tác khác như điều hướng
        message.success("Đã xóa toàn bộ giỏ hàng");
    };

    // Hàm cập nhật số lượng
    const updateQuantity = (id: number, quantity: number) => {
        if (!user) return;
        const cartItem = state.carts.find((item) => item.id === id);
        if (!cartItem) return;

        if (quantity <= 0) {
            const confirmDelete = window.confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ?");
            if (!confirmDelete) return;

            deleteCart(id);
            return;
        }

        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

        mutate({
            id,
            cart: {
                ...cartItem,
                quantity,
            },
        });
    };

    // Hàm thêm vào giỏ hàng
    const addToCart = (product: Product) => {
        if (!user) return;

        const existingCart = state.carts.find(
            (item: Cart) => item.productId === product.id
        );

        const addQuantity = 1;

        mutate({
            id: existingCart?.id,
            cart: {
                userId: user.id,
                productId: product.id,
                quantity: (existingCart?.quantity || 0) + addQuantity,
            },
        });
    };

    return (
        <CartContext.Provider value={{ state, addToCart, updateQuantity, dispatch, clearUserCart, deleteCart }}>
            {children}
        </CartContext.Provider>
    );
};
