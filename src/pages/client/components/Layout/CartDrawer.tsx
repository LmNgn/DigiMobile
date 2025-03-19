import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContent from '../Cart/CartContent';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartDrawer = ({ drawOpen, toggleCart }) => {
  return (
    <div className={`offcanvas offcanvas-end ${drawOpen ? 'show' : ''}`} tabIndex="-1">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Your Cart</h5>
        <button type="button" className="btn-close" onClick={toggleCart} aria-label="Close">
          <IoMdClose className='h5'/>
        </button>
      </div>
      <div className="offcanvas-body overflow-auto">
        <CartContent />
      </div>
      <div className="offcanvas-footer p-3 border-top">
        <button className='btn btn-dark w-100'>Checkout</button>
        <p className='text-center text-muted mt-2 small'>Shipping, taxes and discount codes</p>
      </div>
    </div>
  );
};

export default CartDrawer;