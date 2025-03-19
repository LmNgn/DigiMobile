import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "/src/assets/logo.png";

function Header() {
    const nav = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    const handleLogout = () => {
        if (window.confirm("Bạn muốn đăng xuất ?")) {
            localStorage.removeItem("token");
            toast.success("Đăng xuất thành công!");
            nav("/admin/login");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid d-flex justify-content-between">
                {/* Logo */}
                <div className="d-flex align-items-center logo-container" onClick={() => nav("/admin")} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="Mantis" width="40" height="40" className="logo-img" />
                    <span className="fw-bold text-white ms-2 fs-5">Mantis</span>
                </div>

                {/* Thanh search */}
                <div className="search-container d-flex align-items-center">
                    <div className={`search-box d-flex align-items-center ${showSearch ? "expanded" : ""}`}>
                        <input type="text" className="form-control search-input" placeholder="Tìm kiếm..." />
                        <button className="btn btn-outline-light search-btn" onClick={() => setShowSearch(!showSearch)}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {/* Tài khoản */}
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-light me-2">
                        <i className="bi bi-envelope fs-5"></i>
                    </button>
                    <div className="dropdown">
                        <button className="btn btn-dark d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="rounded-circle border me-2" width="30" height="30" />
                            <span className="fw-bold text-white">Admin</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i> Đăng xuất</button></li>
                        </ul>
                    </div>
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