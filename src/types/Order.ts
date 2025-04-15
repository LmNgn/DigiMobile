export enum OrderStatus {
    PENDING = "Chờ xác nhận", 
    PROCESSING = "Đã xác nhận", 
    SHIPPED = "Đang giao hàng", 
    DELIVERED = "Đã nhận hàng", 
    COMPLETED = "Hoàn tất", 
    RETURNED = "Trả hàng", 
    CANCELED = "Bị huỷ", 

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
    items: OrderItem[];          
    totalAmount?: number;
    note?: string;
};
