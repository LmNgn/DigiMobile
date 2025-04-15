export enum OrderStatus {
    PENDING = "Chờ xác nhận", // chờ xử lý
    PROCESSING = "Đã xác nhận", // được xử lý
    SHIPPED = "Đang giao hàng", // được giao
    DELIVERED = "Đã nhận hàng", // được nhận
    CANCELED = "Bị huỷ", // bị hủy
    COMPLETED = "Hoàn tất", // hoàn tất
    RETURNED = "Trả hàng", // trả lại
}


export type OrderItem = {
    productId: number;
    quantity: number;
};


export type Order = {
    id: number;
    userId: number;
    date: string;      
    status: OrderStatus;
    address: string;
    paymentMethod: "cod" | "banking" | "momo" | string;
    items: OrderItem[];          // Danh sách sản phẩm trong đơn hàng
    totalAmount?: number;
    note?: string;
};
