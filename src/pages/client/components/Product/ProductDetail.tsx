import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import { useOne } from '../../hooks';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: selectedProduct, isLoading, isError } = useOne({ resource: 'products', id });
    const { addToCart } = useCart();

    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showSpecs, setShowSpecs] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            setMainImage(selectedProduct.imageUrl || '');
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action: 'plus' | 'minus') => {
        if (action === 'plus') setQuantity((prev) => prev + 1);
        if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        const productToAdd = {
            ...selectedProduct,
            quantity,
        };
        addToCart(productToAdd);
    };
    if (isLoading) return <div>Đang tải sản phẩm...</div>;
    if (isError || !selectedProduct) return <div>Không tìm thấy sản phẩm.</div>;

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-1 d-flex flex-column gap-2">
                    {[selectedProduct.imageUrl]?.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Thumbnail ${index}`}
                            className="img-thumbnail"
                            style={{
                                cursor: 'pointer',
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                border: mainImage === imageUrl ? '2px solid black' : 'none',
                            }}
                            onClick={() => setMainImage(imageUrl)}
                        />
                    ))}
                </div>

                <div className="col-md-5 text-center">
                    <img
                        src={mainImage}
                        alt="Main Product"
                        className="img-fluid rounded w-100"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>

                <div className="col-md-6">
                    <h1 className="h3">{selectedProduct.name}</h1>
                    {selectedProduct.originalPrice && (
                        <p className="text-muted text-decoration-line-through">
                            ${selectedProduct.originalPrice}
                        </p>
                    )}
                    <p className="h4 text-danger">${selectedProduct.price}</p>
                    <p>{selectedProduct.description || 'Không có mô tả.'}</p>

                    <div className="mb-3">
                        <strong>Số lượng:</strong>
                        <div className="d-flex align-items-center mt-2">
                            <button
                                onClick={() => handleQuantityChange('minus')}
                                className="btn btn-outline-secondary"
                            >
                                -
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange('plus')}
                                className="btn btn-outline-secondary"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-dark w-100 py-2" onClick={handleAddToCart}>
                        Thêm vào giỏ
                    </button>

                    <div className="mt-4">
                        <button
                            className="btn btn-outline-primary w-100"
                            onClick={() => setShowSpecs(!showSpecs)}
                        >
                            {showSpecs ? 'Thu gọn thông số' : 'Xem thông số kỹ thuật'}
                        </button>

                        {showSpecs && selectedProduct.screen && (
                            <table className="table mt-3">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold">Kích thước màn</td>
                                        <td>{selectedProduct.screen.size}"</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Độ phân giải</td>
                                        <td>{selectedProduct.screen.resolution}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Tần số quét</td>
                                        <td>{selectedProduct.screen.rate}Hz</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">RAM</td>
                                        <td>{selectedProduct.ram} GB</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Bộ nhớ</td>
                                        <td>{selectedProduct.memory} GB</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Pin</td>
                                        <td>{selectedProduct.battery} mAh</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
