import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CartContent from '../Cart/CartContent';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CartDrawerProps {
  drawOpen: boolean;
  toggleCart: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ drawOpen, toggleCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/client/order');
  };

  return (
    <>
      {/* Overlay mờ phía sau khi mở drawer */}
      {drawOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={toggleCart}
          style={{ zIndex: 1040 }}
        />
      )}

      {/* Drawer giỏ hàng */}
      <div
        className={`offcanvas offcanvas-end ${drawOpen ? 'show' : ''}`}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{
          width: '350px',
          transform: drawOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: drawOpen ? 'visible' : 'hidden',
          zIndex: 1045,
          transition: 'transform 0.3s ease-in-out, visibility 0.3s ease-in-out',
          backgroundColor: '#fff',
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header của drawer */}
        <div className="offcanvas-header border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
          <h5 className="offcanvas-title fw-bold mb-0">Giỏ hàng của bạn</h5>
          <button
            type="button"
            className="btn border-0 p-0"
            onClick={toggleCart}
            aria-label="Đóng"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Nội dung giỏ hàng */}
        <div className="offcanvas-body overflow-auto p-3 flex-grow-1">
          <CartContent />
        </div>

        {/* Footer chứa nút thanh toán */}
        <div className="p-3 border-top text-center">
          <button className="btn btn-dark w-100" onClick={handleCheckout}>
            Thanh toán ngay
          </button>
          <p className="text-muted mt-2 small">
            Phí ship, thuế và mã giảm giá sẽ được áp dụng
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
