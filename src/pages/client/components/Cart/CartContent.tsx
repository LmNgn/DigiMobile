import React, { useState, useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const CartContent = () => {
    const [cartProduct, setCartProduct] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const resCart = await fetch(`${API_URL}/cart`);
                const cartData = await resCart.json();

                const resProducts = await fetch(`${API_URL}/orders`);
                const productsData = await resProducts.json();

                // Nối dữ liệu sản phẩm vào giỏ hàng
                const cartWithProducts = cartData.map(cartItem => {
                    const product = productsData.find(p => p.id === cartItem.productId);
                    return {
                        ...cartItem,
                        name: product?.product || "Unknown Product",
                        price: product?.price || 0,
                        image: product?.image || "",
                    };
                });

                setCartProduct(cartWithProducts);
            } catch (error) {
                console.error("Lỗi khi fetch giỏ hàng:", error);
            }
        };

        fetchCart();
    }, []);

    const handleRemove = async (id) => {
        try {
            await fetch(`${API_URL}/cart/${id}`, { method: "DELETE" });
            setCartProduct(cartProduct.filter(product => product.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    const handleQuantityChange = async (id, amount) => {
        const updatedCart = cartProduct.map(product =>
            product.id === id ? { ...product, quantity: Math.max(1, product.quantity + amount) } : product
        );

        setCartProduct(updatedCart);

        const updatedProduct = updatedCart.find(p => p.id === id);
        if (updatedProduct) {
            await fetch(`${API_URL}/cart/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: updatedProduct.quantity })
            });
        }
    };

    return (
        <div className="container">
            {cartProduct.length === 0 ? (
                <p className="text-center text-muted">Giỏ hàng trống</p>
            ) : (
                cartProduct.map((product) => (
                    <div key={product.id} className="d-flex justify-content-between align-items-start border-bottom py-3">
                        <div className="d-flex align-items-start">
                            <img src={product.image} className="img-thumbnail me-3" alt={product.name} width="80" height="100" />
                            <div>
                                <h5>{product.name}</h5>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                    <span className="mx-3">{product.quantity}</span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <p className="fw-bold">$ {product.price.toLocaleString()}</p>
                            <button className="btn btn-link text-danger p-0" onClick={() => handleRemove(product.id)}>
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
