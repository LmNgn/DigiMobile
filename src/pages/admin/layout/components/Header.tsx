import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "/src/assets/logo.png";
import { message } from "antd";
function Header() {
  const nav = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("token");
      message.success("Đăng xuất thành công!");
      nav("/admin/login");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid d-flex justify-content-between">
        {/* Logo */}
        <div
          className="d-flex align-items-center logo-container"
          onClick={() => nav("/admin")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Mantis"
            width="40"
            height="40"
            className="logo-img"
          />
          <span className="fw-bold text-white ms-2 fs-5">DigiMobile</span>
        </div>

        {/* Tài khoản */}
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-dark d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
            >
              <span className="fw-bold text-white">Admin</span>
            </button>
          </div>
          <button className="btn btn-dark" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
      </div>

      <style>
        {`
                .navbar {
                    height: 56px;
                    z-index: 1050;
                }

                .logo-img {
                    background-color: white;
                    padding: 6px;
                    border-radius: 10px;
                }

                .search-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    transition: width 0.3s ease-in-out;
                }

                .search-input {
                    width: 0;
                    opacity: 0;
                    transition: all 0.3s ease-in-out;
                    border-radius: 20px;
                }

                .search-box.expanded .search-input {
                    width: 200px;
                    opacity: 1;
                    padding: 5px 10px;
                }

                .search-btn {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                `}
      </style>
    </nav>
  );
}

export default Header;
