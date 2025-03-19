
export enum OrderStatus {
    Pending = "Pending",       // Đang chờ xử lý
    Confirmed = "Confirmed",   // Đã xác nhận
    Shipped = "Shipped",       // Đã vận chuyển
    Delivered = "Delivered",   // Đã giao hàng
    Cancelled = "Cancelled",   // Đã hủy
    Returned = "Returned"      // Trả hàng

}

export type Order = {
    id: number;
    userId: number;
    products: {
        productId: number;
        quantity: number;
    }[];
    totalPrice: number;
    orderDate: string;
    status: OrderStatus;
};