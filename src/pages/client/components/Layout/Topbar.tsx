import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

const Topbar = () => {
  return (
    <div className="bg-danger text-white py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div className='d-none d-md-flex align-items-center gap-3'>
          <a href="#" className="text-white text-decoration-none">
            <TbBrandMeta size={20} />
          </a>
          <a href="#" className="text-white text-decoration-none">
            <IoLogoInstagram size={20} />
          </a>
          <a href="#" className="text-white text-decoration-none">
            <RiTwitterXLine size={18} />
          </a>
        </div>
        <div className='text-center flex-grow-1'>
          <span>We ship worldwide</span>
        </div>
        <div className='d-none d-md-block'>
          <a href="tel:+1234567890" className='text-white text-decoration-none'>+1 (234) 567-890</a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;