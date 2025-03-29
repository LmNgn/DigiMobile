import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CartContent from '../Cart/CartContent';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartDrawer = ({ drawOpen, toggleCart }) => {
  const navigate = useNavigate(); // Hook điều hướng trang

  const handleCheckout = () => {
    toggleCart(); // Đóng giỏ hàng trước khi chuyển trang
    navigate('/client/order'); // Chuyển sang trang thanh toán
  };

  return (
    <>
      {/* Overlay khi mở giỏ hàng */}
      {drawOpen && <div className="offcanvas-backdrop fade show" onClick={toggleCart}></div>}

      {/* Drawer giỏ hàng */}
      <div className={`offcanvas offcanvas-end ${drawOpen ? 'show' : ''}`} tabIndex="-1" style={{ width: '350px' }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Giỏ hàng của bạn</h5>
          <button type="button" className="btn-close" onClick={toggleCart} aria-label="Close">
            <IoMdClose className="h5" />
          </button>
        </div>

        <div className="offcanvas-body overflow-auto">
          <CartContent />
        </div>

        <div className="offcanvas-footer p-3 border-top text-center">
          <button className="btn btn-dark w-100" onClick={handleCheckout}>
            Thanh toán ngay
          </button>
          <p className="text-muted mt-2 small">Phí ship, thuế và mã giảm giá sẽ được áp dụng</p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
