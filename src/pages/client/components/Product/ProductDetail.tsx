import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedStorage, setSelectedStorage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showSpecs, setShowSpecs] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    const [newReview, setNewReview] = useState({
        user: "",
        rating: 5,
        comment: ""
      });

      const handleReviewSubmit = async (e) => {
        e.preventDefault();
      
        if (!newReview.user || !newReview.comment) {
          alert("Vui lòng điền đầy đủ thông tin!");
          return;
        }
      
        const updatedReviews = [...(product.reviews || []), newReview];
      
        try {
          // Gửi PATCH request để cập nhật reviews
          const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reviews: updatedReviews }),
          });
      
          if (response.ok) {
            // Cập nhật UI sau khi lưu thành công
            setProduct({ ...product, reviews: updatedReviews });
            setNewReview({ user: "", rating: 5, comment: "" });
            setReviewSuccess(true);
            setTimeout(() => setReviewSuccess(false), 3000);
          } else {
            alert("Lỗi khi gửi đánh giá");
          }
        } catch (error) {
          console.error("Lỗi:", error);
          alert("Không thể gửi đánh giá");
        }
      };
      
      
    // Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`) // Lấy sản phẩm đầu tiên từ danh sách
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setMainImage(data.images[0].url);
                setSelectedColor(data.colors[0]);
                setSelectedStorage(data.storages[0]);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, [id]);

    if (!product) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            <div className="spinner-border text-dark" role="status"></div>
            <span className="ms-3">Loading product...</span>
        </div>
    );

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <div className="container py-5">
            <div className="row">
                {/* Cột hình ảnh sản phẩm */}
                <div className="col-md-1 d-flex flex-column gap-2">
                    {product.images.map((image, index) => (
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
                    <h1 className="h3">{product.name}</h1>
                    <p className="text-muted text-decoration-line-through">
                        ${product.originalPrice}
                    </p>
                    <p className="h4 text-danger">${product.price}</p>
                    <p>{product.description}</p>

                    {/* Chọn màu */}
                    <div className="mb-3">
                        <strong>Color:</strong>
                        <div className="d-flex mt-2 gap-2">
                            {product.colors.map((color) => (
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
                            {product.storages.map((storage) => (
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
                                    {Object.entries(product.specifications).map(([key, value]) => (
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
                {/* Đánh giá sản phẩm */}

<div className="mt-5">
  <div className="card shadow-sm border-0">
    <div className="card-header bg-white d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Đánh giá sản phẩm</h5>
      <button 
        className="btn btn-sm btn-outline-success" 
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? "Ẩn đánh giá" : "Hiện đánh giá"}
      </button>
    </div>

    {showReviews && (
      <div className="card-body">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border-bottom pb-3 mb-3">
              <h6 className="mb-1">{review.user}</h6>
              <p className="mb-1 text-warning">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
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

  {/* Form đánh giá */}
  <div className="card mt-4 shadow-sm border-0">
    <div className="card-header bg-white">
      <h5 className="mb-0">Viết đánh giá của bạn</h5>
    </div>
    <div className="card-body">
    {reviewSuccess && (
  <div className="alert alert-success" role="alert">
    Đánh giá đã được gửi thành công!
  </div>
)}

      <form onSubmit={handleReviewSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên của bạn</label>
          <input
            type="text"
            className="form-control"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            placeholder="Nhập tên"
          />
        </div>

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
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
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
