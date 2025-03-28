import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function Layout() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const nav = useNavigate();

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <nav className="sidebar bg-light p-3 border-end">
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item">
            <Link className="nav-link text-dark hover-effect" to="/admin">
              <i className="fa-solid fa-chart-simple me-2" /> Thống kê
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark hover-effect" to="/admin/categories">
              <i className="fa-solid fa-list me-2" /> Danh mục
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark hover-effect" to="/admin/products">
              <i className="fas fa-box me-2" /> Sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark hover-effect" to="/admin/orders">
              <i className="fa-solid fa-truck-fast me-2" /> Đơn hàng
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="w-100 nav-link hover-effect text-dark d-flex align-items-center btn btn-link"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <i className="fas fa-users-cog me-2" /> Quản lý tài khoản 
              <i className={`fas fa-angle-${isDropdownOpen ? "down" : "left"} ms-auto`} />
            </button>
            <ul className={`nav flex-column text-center dropdown-menu${isDropdownOpen ? " show" : ""}`}>
              <li className="nav-item">
                <Link className="nav-link hover-effect text-dark" to="/admin/account">
                  Quản trị viên
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link hover-effect text-dark" to="/admin/account/customers">
                  Khách hàng
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Header />
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>

      <style>
        {`
        .layout-container {
          display: flex;
        }

        /* Sidebar */
        .sidebar {
          width: 250px;
          height: 100vh;
          position: fixed;
          top: 56px; /* Để không bị Header che */
          left: 0;
          overflow-y: auto;
          transition: all 0.3s ease-in-out;
        }

        .nav-link {
          transition: background-color 0.3s ease, color 0.3s ease;
          padding: 10px;
        }

        .nav-link:hover {
          background-color: #007bff;
          color: white !important;
          border-radius: 5px;
        }

        .dropdown-menu {
          display: ${isDropdownOpen ? "block" : "none"};
        }

        .dropdown-menu .nav-link {
          padding: 8px 15px;
        }

        .dropdown-menu .nav-link:hover {
          background-color: rgb(93, 159, 230);
          color: #f8f9fa !important;
        }

        /* Main Content */
        .main-content {
          flex-grow: 1;
          margin-left: 250px;
          margin-top: 56px;
          width: calc(100% - 250px);
          transition: margin-left 0.3s ease-in-out;
        }

        .content-container {
          padding: 20px;
        }
        `}
      </style>
    </div>
  );
}

export default Layout;