import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import { useOne } from '../../hooks';
import { useUser } from '../../context/userContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: selectedProduct, isLoading, isError } = useOne({ resource: 'products', id });
    const { addToCart } = useCart();
    const { user, loading: userLoading } = useUser();
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showSpecs, setShowSpecs] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });
    const [reviewSuccess, setReviewSuccess] = useState(false);

    // Tự động ẩn thông báo
    useEffect(() => {
        if (reviewSuccess) {
            const timer = setTimeout(() => setReviewSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [reviewSuccess]);

    // Cập nhật ảnh chính
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        } else if (selectedProduct?.imageUrl) {
            setMainImage(selectedProduct.imageUrl);
        }

        // Cập nhật danh sách đánh giá
        if (selectedProduct?.reviews) {
            setReviews(selectedProduct.reviews);
        }
    }, [selectedProduct]);

    // Gán email người dùng vào đánh giá nếu đã đăng nhập
    useEffect(() => {
        if (user?.email) {
            setNewReview((prev) => ({ ...prev, user: user.email }));
        }
    }, [user]);

    const handleQuantityChange = (action) => {
        if (action === 'plus') setQuantity((prev) => prev + 1);
        if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        const productToAdd = { ...selectedProduct, quantity };
        addToCart(productToAdd);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Vui lòng đăng nhập để gửi đánh giá!");
            return;
        }

        const finalReview = {
            ...newReview,
            user: user.email || newReview.user,
        };

        if (finalReview.user && finalReview.comment) {
            const updatedReviews = [...reviews, finalReview];

            try {
                await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reviews: updatedReviews }),
                });

                setReviews(updatedReviews);
                
                setNewReview({ user: user.email, rating: 5, comment: '' });
                alert("Đánh giá đã được gửi thành công!");
            } catch (error) {
                alert("Gửi đánh giá thất bại!");
            }
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
    };

    if (isLoading || userLoading) return <div>Đang tải sản phẩm...</div>;
    if (isError || !selectedProduct) return <div>Không tìm thấy sản phẩm.</div>;

    return (
        <div className="container py-5">
            <div className="row">
                {/* Thumbnails */}
                <div className="col-md-1 d-flex flex-column gap-2">
                    {selectedProduct.images?.map((img:any, index:number) => (
                        <img
                            key={index}
                            src={img.url}
                            alt={img.altText || `Thumbnail ${index}`}
                            className="img-thumbnail"
                            style={{
                                cursor: 'pointer',
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                border: mainImage === img.url ? '2px solid black' : 'none',
                            }}
                            onClick={() => setMainImage(img.url)}
                        />
                    ))}
                </div>

                {/* Main Image */}
                <div className="col-md-5 text-center">
                    <img
                        src={mainImage}
                        alt="Main Product"
                        className="img-fluid rounded w-100"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>

                {/* Product Info */}
                <div className="col-md-6">
                    <h1 className="h3">{selectedProduct.name}</h1>
                    {selectedProduct.originalPrice && (
                        <p className="text-muted text-decoration-line-through">
                            ${selectedProduct.originalPrice}
                        </p>
                    )}
                    <p className="h4 text-danger">${selectedProduct.price}</p>
                    <p>{selectedProduct.description || 'Không có mô tả.'}</p>

                    {/* Quantity */}
                    <div className="mb-3">
                        <strong>Số lượng:</strong>
                        <div className="d-flex align-items-center mt-2">
                            <button onClick={() => handleQuantityChange('minus')} className="btn btn-outline-secondary">-</button>
                            <span className="mx-3">{quantity}</span>
                            <button onClick={() => handleQuantityChange('plus')} className="btn btn-outline-secondary">+</button>
                        </div>
                    </div>

                    <button className="btn btn-dark w-100 py-2" onClick={handleAddToCart}>
                        Thêm vào giỏ
                    </button>

                    {/* Specifications */}
                    <div className="mt-4">
                        <button className="btn btn-outline-primary w-100" onClick={() => setShowSpecs(!showSpecs)}>
                            {showSpecs ? 'Thu gọn thông số' : 'Xem thông số kỹ thuật'}
                        </button>
                        {showSpecs && selectedProduct.specifications && (
                            <table className="table mt-3">
                                <tbody>
                                    <tr><td className="fw-bold">Kích thước màn</td><td>{selectedProduct.specifications.screen}</td></tr>
                                    <tr><td className="fw-bold">RAM</td><td>{selectedProduct.specifications.ram}</td></tr>
                                    <tr><td className="fw-bold">Bộ nhớ</td><td>{selectedProduct.specifications.storage}</td></tr>
                                    <tr><td className="fw-bold">Pin</td><td>{selectedProduct.specifications.battery}</td></tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Đánh giá sản phẩm</h5>
                            <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => setShowReviews(!showReviews)}
                            >
                                {showReviews ? 'Ẩn đánh giá' : 'Hiện đánh giá'}
                            </button>
                        </div>

                        {showReviews && (
                            <div className="card-body">
                                {reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <div key={index} className="border-bottom pb-3 mb-3">
                                            <h6 className="mb-1">{review.user}</h6>
                                            <p className="mb-1 text-warning">
                                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                            </p>
                                            <p className="mb-0">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">Chưa có đánh giá nào cho sản phẩm này.</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Review Form */}
<div className="card mt-4 shadow-sm border-0">
    <div className="card-header bg-white">
        <h5 className="mb-0">Viết đánh giá của bạn</h5>
    </div>
    <div className="card-body">
        <form onSubmit={handleReviewSubmit}>
            {/* Nếu đã đăng nhập, hiển thị tên/email ở dạng chỉ đọc */}
            {user?.email ? (
                <div className="mb-3">
                    <label className="form-label">Tài khoản</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.email}
                        disabled
                    />
                </div>
            ) : (
                // Nếu chưa đăng nhập, yêu cầu nhập tên
                <div className="mb-3">
                    <label className="form-label">Tài khoản</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newReview.user}
                        onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                        placeholder="Nhập email"
                    />
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Đánh giá sao</label>
                <select
                    className="form-select"
                    value={newReview.rating}
                    onChange={(e) =>
                        setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                    }
                >
                    {[5, 4, 3, 2, 1].map((star) => (
                        <option key={star} value={star}>
                            {star} sao
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Nhận xét</label>
                <textarea
                    className="form-control"
                    rows="3"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Viết nhận xét tại đây..."
                ></textarea>
            </div>

            <button type="submit" className="btn btn-success">
                Gửi đánh giá
            </button>
        </form>
    </div>
</div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
