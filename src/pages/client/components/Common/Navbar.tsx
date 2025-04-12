import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiMiniKey,

} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";

const Navbar = () => {
  const nav = useNavigate();
  const [drawOpen, setDrawOpen] = useState(false);
  const [navDraw, setNavDraw] = useState(false);

  const { state } = useCart();
  const { user, loading } = useUser();

  const totalItems = state.carts.reduce((sum, item) => sum + item.quantity, 0);

  const toggleNavDraw = () => setNavDraw(!navDraw);
  const toggleCart = () => setDrawOpen(!drawOpen);
  const toAdmin = () => {
    if (confirm("Chuyển sang trang quản trị?")) {
      nav("/admin");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            DigiMobile
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavDraw}
          >
            <HiBars3BottomRight className="h-6 w-6" />
          </button>

          <div className={`collapse navbar-collapse ${navDraw ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  Về chúng tôi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Nếu là admin0 hoặc admin1 thì hiện nút admin */}
            {!loading &&
              (user?.role === "admin0" || user?.role === "admin1") && (
                <button
                  onClick={() => toAdmin()}
                  className="btn btn-link text-dark"
                >
                  <HiMiniKey className="h-6 w-6"/>
                </button>
              )}

            {/* Nút profile */}
            {!loading && user ? (
              <Link to="/profile" className="btn btn-link text-dark">
                <HiOutlineUser className="h-6 w-6" />
              </Link>
            ) : (
              <Link to="/login" className="btn btn-link text-dark">
                <HiOutlineUser className="h-6 w-6" />
              </Link>
            )}

            {/* Nút giỏ hàng */}
            {!loading && user ? (
              <button
                onClick={toggleCart}
                className="btn btn-link text-dark position-relative"
              >
                <HiOutlineShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            ) : (
              <Link to="/login" className="btn btn-link text-dark">
                <HiOutlineShoppingBag className="h-6 w-6" />
              </Link>
            )}

            {/* Nút tìm kiếm */}
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Drawer giỏ hàng */}
      <CartDrawer drawOpen={drawOpen} toggleCart={toggleCart} />
    </>
  );
};

export default Navbar;
