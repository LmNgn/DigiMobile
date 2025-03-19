import React from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="border-top py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3">
            <h5 className="text-dark mb-3">Account</h5>
            <p className="text-muted">Quản lý tài khoản</p>
            <p className="fw-medium text-muted">Đăng ký để được giảm giá 10% cho đơn hàng đầu tiên của bạn</p>
            <form className="d-flex">
              <input type="email" placeholder="Enter your email" className="form-control me-2" required />
              <button type="submit" className="btn btn-dark">Subscribe</button>
            </form>
          </div>

          <div className="col-md-3">
            <h5 className="text-dark mb-3">Shop</h5>
            <ul className="list-unstyled text-muted">
              <li><Link to="#" className="text-decoration-none text-muted">Ứng dụng</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Tài chính</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Tình trạng đơn hàng</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Hỗ trợ mua hànghàng</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="text-dark mb-3">Support</h5>
            <ul className="list-unstyled text-muted">
              <li><Link to="#" className="text-decoration-none text-muted">Liên hệ với chúng tôi</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Về chúng tôi</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Câu hỏi thường gặp</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Sự kiện</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="text-dark mb-3">Follow Us</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <TbBrandMeta size={20} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <IoLogoInstagram size={20} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <RiTwitterXLine size={20} />
              </a>
            </div>
            <p className="text-muted">Call Us</p>
            <p className="fw-bold">
              <FiPhoneCall className="me-2" /> 0123-456-789
            </p>
          </div>
        </div>

        <div className="border-top pt-4 mt-4 text-center text-muted">
          <p className="small">Bản quyền © Mantes. 2025 Bảo lưu mọi quyền.<br/>
          Công Ty TNHH Việt Nam -
          ĐKKD số 0313510827, do Sở KH&ĐT thành phố Hồ Chí Minh cấp ngày 28 tháng 10 năm 2015 -
          Giấy phép kinh doanh số 0313510827/KD-0137 do Sở Công Thương thành phố Hồ Chí Minh cấp ngày 23 tháng 5 năm 2018 -
          Địa chỉ: Phòng 901, Ngôi Nhà Đức Tại Tp. Hồ Chí Minh, số 33, đường Lê Duẩn, Phường Bến Nghé, Quận 1, thành phố Hồ Chí Minh, Việt Nam </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;