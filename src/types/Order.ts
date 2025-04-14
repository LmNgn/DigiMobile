export enum OrderStatus {
    PENDING = "pending", // chờ xử lý
    PROCESSING = "processing", // được xử lý
    SHIPPED = "shipped", // được giao
    DELIVERED = "delivered", // được nhận
    CANCELED = "canceled", // bị hủy
    COMPLETED = "completed", // hoàn tất
    RETURNED = "returned", // trả lại
  }
  
  // Order type
  export type Order = {
    id: number;
    userId: number;
    date: Date;
    status: OrderStatus;
    address: string;
    paymentMethod: string;
  };
  