import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function Layout() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="sidebar bg-light vh-100 p-3 border-end">
        <h4 className="text-primary fw-bold mb-3">Mantis</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin">
              <i className="fa-solid fa-chart-simple me-2" /> Thống kê
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin/category">
              <i className="fa-solid fa-list me-2" /> Danh mục
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin/product">
              <i className="fas fa-box me-2" /> Sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/admin/order">
              <i className="fa-solid fa-truck-fast me-2" /> Đơn hàng
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-dark d-flex align-items-center btn btn-link"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <i className="fas fa-users-cog me-2" /> Quản lý tài khoản
              <i className={`fas fa-angle-${isDropdownOpen ? "down" : "left"} ms-auto`} />
            </button>
            {isDropdownOpen && (
              <ul className="nav flex-column ps-3">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/admin/account">
                    Quản trị viên
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/admin/account/customer">
                    Khách hàng
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <Header />
        <div className="container-fluid">
          {/* Content Outlet */}
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;