import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOne } from "../hooks";
import { OrderStatus } from "../../../types/Order";
import { message } from "antd";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useUser } from "../context/userContext";
const statusOrderFlow = [
    OrderStatus.PENDING,
    OrderStatus.PROCESSING,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
    OrderStatus.COMPLETED,
    OrderStatus.RETURNED,
    OrderStatus.CANCELED,
];
const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: order } = useOne({ resource: "orders", id });

    const [products, setProducts] = useState<any[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();
    const { logout } = useUser;
    // Lấy thông tin người dùng
    const userId = order?.userId;
    const { data: user } = useOne(
        userId ? { resource: "users", id: userId } : { resource: "users", id: "" }
    );

    // Lấy thông tin nhiều sản phẩm
    useEffect(() => {
        const fetchProducts = async () => {
            if (order?.items?.length) {
                const productPromises = order.items.map(async (item: any) => {
                    const res = await fetch(`http://localhost:3000/products/${item.productId}`);
                    return res.json();
                });

                const result = await Promise.all(productPromises);
                setProducts(result);
                reset({
                    status: order.status,
                });
            }
        };

        fetchProducts();
    }, [order, reset]);

    // Khi submit form
    const onFinish = async (values: any) => {
        if (!id || !order) return;

        const currentIndex = statusOrderFlow.indexOf(order.status);
        const nextIndex = statusOrderFlow.indexOf(values.status);

        // Không cho phép cập nhật lùi trạng thái
        if (nextIndex < currentIndex) {
            message.error("Không thể cập nhật về trạng thái trước đó!");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error("Cập nhật thất bại");

            const updatedOrder = await res.json();
            message.success("Cập nhật thành công:", updatedOrder);
            navigate("/my_orders");
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            alert("Cập nhật thất bại!");
        }
    };

    const orderStatusOptions = Object.entries(OrderStatus).filter(
        ([key, value]) => value === OrderStatus.PENDING || value === OrderStatus.CANCELED
    );
    

    const totalAmount = order?.items?.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
    );
    const isStatusLocked =
        order && statusOrderFlow.indexOf(order.status) >= statusOrderFlow.indexOf(OrderStatus.SHIPPED);
    return (
        <Container className="mt-5 mb-5 d-flex justify-content-center">
            <Card className="p-4 shadow-lg w-75 rounded-4">
                <Row>
                    <Col md={2} className="border-end">
                        <h4 className="fw-bold text-primary">Thông tin tài khoản</h4>
                        <ul className="list-unstyled mt-3">
                            <li>
                                <Link to="/profile" className="text-danger fw-bold text-decoration-none">Tài khoản</Link>
                            </li>
                            <li>
                                <Link to="/my_orders" className="text-muted text-decoration-none">Đơn hàng</Link>
                            </li>
                            {/* Nút đăng xuất */}
                            <Button
                                variant="link"
                                onClick={logout}
                                className="text-muted p-0 d-flex align-items-center"

                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Đăng xuất
                            </Button>
                        </ul>
                    </Col>
                    <Col md={10}>
                        <div className="container-fluid">
                            {/* Tiêu đề */}
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Thông tin đơn hàng</h1>
                            </div>

                            {/* Thông tin cơ bản */}
                            <div className="m-auto mb-3 row col-md-8">
                                <h5 className="text-center mb-3">Thông tin cơ bản</h5>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Tên khách hàng:</th>
                                            <td>{user?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Điện thoại:</th>
                                            <td>{user?.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ:</th>
                                            <td>{order?.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Ngày đặt hàng:</th>
                                            <td>
                                                {new Date(order?.date)
                                                    .toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</td>
                                        </tr>
                                        <tr>
                                            <th>Phương thức thanh toán:</th>
                                            <td>{order?.paymentMethod}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {isStatusLocked && (
                                <p className="text-center text-danger fw-bold">
                                    Đơn hàng đã được chuyển đi. Không thể cập nhật trạng thái nữa.
                                </p>
                            )}

                            {!isStatusLocked && (
                                <form className="offset-2 col-md-8" onSubmit={handleSubmit(onFinish)}>
                                    <h5 className="text-center mb-3">Cập nhật trạng thái</h5>
                                    <div className="mb-3 row">
                                        <label htmlFor="status" className="col-sm-2 col-form-label text-end">
                                            Trạng thái đơn hàng
                                        </label>
                                        <div className="col-sm-10">
                                        <select
                                            className="form-control"
                                            id="status"
                                            {...register("status", { required: true })}
                                        >
                                            <option value="">-- Chọn trạng thái --</option>
                                            {orderStatusOptions.map(([key, value]) => (
                                                <option key={key} value={value}>
                                                    {key.charAt(0) + key.slice(1).toLowerCase()}
                                                </option>
                                            ))}
                                        </select>

                                            {errors.status && <p className="text-danger">Vui lòng chọn trạng thái</p>}
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-center">
                                        <div className="col-sm-10 offset-8">
                                            <button type="submit" className="btn btn-primary">
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* Thông tin sản phẩm */}
                            <div className="mx-auto mb-3 row col-md-8">
                                <h5 className="text-center my-5">Thông tin sản phẩm</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.items?.map((item: any, index: number) => {
                                            const product = products.find((p) => p?.id === item.productId);
                                            return (
                                                <tr key={index}>
                                                    <td>{product?.name || "N/A"}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{product?.price?.toLocaleString()} đ</td>
                                                    <td>{(product?.price * item.quantity)?.toLocaleString()} đ</td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <th colSpan={3} className="text-end">
                                                Tổng tiền:
                                            </th>
                                            <td>{totalAmount?.toLocaleString()} đ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>

    );
};

export default OrderDetail;
