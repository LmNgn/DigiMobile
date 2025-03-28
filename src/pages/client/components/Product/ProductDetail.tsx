import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const selectedProduct = {
    name: "Stylish Phone",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish smartphone perfect for any occasion",
    brand: "TechBrand",
    material: "Aluminum",
    colors: ["#800000", "#000000"],
    storages: ["128", "256", "512"],
    images: [
        { url: "https://picsum.photos/id/237/500/500", altText: "Phone Front" },
        { url: "https://picsum.photos/id/238/500/500", altText: "Phone Side" },
    ],
    specifications: {
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB",
        storage: "128GB / 256GB / 512GB",
        screen: "6.5-inch OLED, 120Hz",
        battery: "4500mAh, Fast Charging 65W",
        camera: "50MP + 12MP + 10MP",
        os: "Android 13",
    },
    reviews: [
        { user: "John Doe", rating: 5, comment: "Amazing phone with great performance!" },
        { user: "Jane Smith", rating: 4, comment: "Nice design but battery life could be better." },
    ]
};

const ProductDetail = () => {
    const [mainImage, setMainImage] = useState("");
    const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
    const [selectedStorage, setSelectedStorage] = useState(selectedProduct.storages[0]);
    const [quantity, setQuantity] = useState(1);
    const [showSpecs, setShowSpecs] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    
    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, []);

    return (
        <div className="container py-5">
            <div className="row">
                {/* Cột hình ảnh sản phẩm */}
                <div className="col-md-1 d-flex flex-column gap-2">
                    {selectedProduct.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index}`}
                            className="img-thumbnail"
                            style={{
                                cursor: 'pointer',
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                border: mainImage === image.url ? "2px solid black" : "none",
                            }}
                            onClick={() => setMainImage(image.url)}
                        />
                    ))}
                </div>

                {/* Ảnh chính */}
                <div className="col-md-5 text-center">
                    <img 
                        src={mainImage} 
                        alt="Main Product" 
                        className="img-fluid rounded w-100" 
                        style={{ maxHeight: '400px', objectFit: 'contain' }} 
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="col-md-6">
                    <h1 className="h3">{selectedProduct.name}</h1>
                    <p className="text-muted text-decoration-line-through">
                        ${selectedProduct.originalPrice}
                    </p>
                    <p className="h4 text-danger">${selectedProduct.price}</p>
                    <p>{selectedProduct.description}</p>

                    {/* Chọn màu */}
                    <div className="mb-3">
                        <strong>Color:</strong>
                        <div className="d-flex mt-2 gap-2">
                            {selectedProduct.colors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        cursor: 'pointer',
                                        borderRadius: '50%',
                                        border: selectedColor === color ? "3px solid black" : "2px solid #ddd",
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                >
                                    <span
                                        style={{
                                            backgroundColor: color,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    ></span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chọn size */}
                    <div className="mb-3">
                        <strong>Storage:</strong>
                        <div className="d-flex mt-2 gap-2">
                            {selectedProduct.storages.map((storage) => (
                                <button
                                    key={storage}
                                    onClick={() => setSelectedStorage(storage)}
                                    className={`btn fw-bold ${selectedStorage === storage ? "btn-dark text-white" : "btn-outline-secondary"}`}
                                    style={{ minWidth: "60px", borderRadius: "8px" }}
                                >
                                    {storage} GB
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chọn số lượng */}
                    <div className="mb-3">
                        <strong>Quantity:
                        <div className="d-flex align-items-center mt-2">
                            <button onClick={() => handleQuantityChange("minus")} className="btn btn-outline-secondary">-</button>
                            <span className="mx-3">{quantity}</span>
                            <button onClick={() => handleQuantityChange("plus")} className="btn btn-outline-secondary">+</button>
                        </div>
                        </strong>
                    </div>

                    {/* Nút thêm vào giỏ hàng */}
                    <button className="btn btn-dark w-100 py-2">ADD TO CART</button>

                    {/* Xem thông số kỹ thuật */}
                    <div className="mt-4">
                        <button className="btn btn-outline-primary w-100" onClick={() => setShowSpecs(!showSpecs)}>
                            {showSpecs ? "Thu gọn thông số" : "Xem thông số kỹ thuật"}
                        </button>
                        {showSpecs && (
                            <table className="table mt-3">
                                <tbody>
                                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="fw-bold">{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <div className="container py-5">
            <div className="row">
                {/* Xem đánh giá sản phẩm */}
                <div className="mt-4">
                    <div className="border p-3 rounded" style={{ background: "#f8f9fa" }}>
                        <h4 className="mb-3">Đánh giá sản phẩm</h4>
                        <div className="d-flex align-items-center">
                            <span className="h2 text-warning">⭐ 4.9</span>
                            <span className="ms-2">/5</span>
                            <span className="ms-3">6.5k khách hài lòng</span>
                        </div>
                        <div className="progress mt-2" style={{ height: "5px" }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "99.9%" }}></div>
                        </div>
                        <button className="btn btn-outline-primary w-100 mt-3" onClick={() => setShowReviews(!showReviews)}>
                            {showReviews ? "Thu gọn đánh giá" : "Xem đánh giá sản phẩm"}
                        </button>
                        {showReviews && (
                            <div className="mt-3">
                                {selectedProduct.reviews.map((review, index) => (
                                    <div key={index} className="border p-3 mb-2 rounded bg-white">
                                        <strong>{review.user}</strong> - ⭐ {review.rating}/5
                                        <p className="mb-0">{review.comment}</p>
                                    </div>
                                ))}
                                <button className="btn btn-outline-secondary w-100 mt-2">Xem thêm đánh giá</button>
                            </div>
                        )}
                        <button className="btn btn-primary w-100 mt-3">Viết đánh giá</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProductDetail;
