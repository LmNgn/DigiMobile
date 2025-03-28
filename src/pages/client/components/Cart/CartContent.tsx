import React, { useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from "../../../../assets/image4.png";
import Image2 from "../../../../assets/image5.png";

const CartContent = () => {
    const [cartProduct, setCartProduct] = useState([
        {
            productId: 1,
            name: "Iphone 1",
            color: "Black",
            quantity: 1,
            price: 999,
            image: Image1
        },
        {
            productId: 2,
            name: "Iphone 2",
            color: "Pink",
            quantity: 1,
            price: 1800,
            image: Image2
        },
        {
            productId: 3,
            name: "Iphone 3",
            color: "Blue",
            quantity: 1,
            price: 2700,
            image: Image1
        }
    ]);

    // Xóa sản phẩm
    const handleRemove = (id) => {
        setCartProduct(cartProduct.filter(product => product.productId !== id));
    };

    // Thay đổi số lượng
    const handleQuantityChange = (id, amount) => {
        setCartProduct(cartProduct.map(product =>
            product.productId === id
                ? { ...product, quantity: Math.max(1, product.quantity + amount) }
                : product
        ));
    };

    return (
        <div className="container">
            {cartProduct.length === 0 ? (
                <p className="text-center text-muted">Giỏ hàng trống</p>
            ) : (
                cartProduct.map((product) => (
                    <div key={product.productId} className="d-flex justify-content-between align-items-start border-bottom py-3">
                        <div className="d-flex align-items-start">
                            <img src={product.image} className="img-thumbnail me-3" alt={product.name} width="80" height="100" />
                            <div>
                                <h5>{product.name}</h5>
                                <p className="text-muted mb-2">Màu: {product.color}</p>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(product.productId, -1)}>-</button>
                                    <span className="mx-3">{product.quantity}</span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(product.productId, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <p className="fw-bold">$ {product.price.toLocaleString()}</p>
                            <button className="btn btn-link text-danger p-0" onClick={() => handleRemove(product.productId)}>
                                <RiDeleteBin3Line size={24} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartContent;
