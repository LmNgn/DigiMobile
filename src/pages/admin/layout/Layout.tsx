import { Outlet, useNavigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
function Layout() {
  const nav = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      nav("/admin/login");
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className="sidebar border border-right col-md-3 col-lg-2 p-0"
            style={{ height: "100vh" }}
          >
            <div
              className=" bg-body-tertiary"
              tabIndex={-1}
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/admin"
                    >
                      <i className="fa-solid fa-chart-simple" />
                      Thống kê
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/admin/categories"
                    >
                      <i className="fa-solid fa-list" />
                      Danh mục
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/admin/products"
                    >
                      <i className="fas fa-box" />
                      Sản phẩm
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/admin/orders"
                    >
                      <i className="fa-solid fa-truck-fast" />
                      Đơn hàng
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link d-flex align-items-center gap-2 btn btn-link"
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      <i className="nav-icon fas fa-users-cog" />
                      <span>Quản lý tài khoản</span>
                      <i
                        className={`fas fa-angle-${isDropdownOpen ? "down" : "left"
                          } right`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <ul className="nav nav-treeview ps-3">
                        <li className="nav-item">
                          <Link className="nav-link" to="/admin/account">
                            <span>Quản trị viên</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="/admin/account/customers"
                          >
                            <span>Khách hàng</span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <main className="col-md-12 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
