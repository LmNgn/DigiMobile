import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "/src/assets/logo.png"
function Header() {
    const nav = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const handleLogout = () => {
        const confirm = window.confirm("Bạn muốn đăng xuất ?");
        if (!confirm) return;
        localStorage.removeItem("token");
        toast.success("Đăng xuất thành công!");
        nav('admin/login');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            {/* Logo */}
            <div className="d-flex align-items-center logo-container" onClick={() => nav("/")}>
                <img
                    src={logo}
                    alt="Mantis"
                    width="40"
                    height="40"
                    className="logo-img"
                />
                <span className="fw-bold text-white ms-2 fs-5 logo-text">Mantis</span>
            </div>

            {/* Thanh search*/}
            <div className="mx-auto d-flex align-items-center">
                <div 
                    className={`search-box d-flex align-items-center ${showSearch ? "expanded" : ""}`}
                >
                    <input 
                        type="text" 
                        className="form-control search-input" 
                        placeholder="Search here..."
                    />
                    <button 
                        className="btn btn-outline-light search-btn" 
                        onClick={() => setShowSearch(!showSearch)}
                    >
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
                    <button
                        className="btn btn-dark d-flex align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="User Avatar"
                            className="rounded-circle border me-2"
                            width="30"
                            height="30"
                        />
                        <span className="fw-bold text-white">Admin</span>
                    </button>
                    
                </div>
            </div>

            <style>
                {`
                .logo-text {
                    cursor: pointer;
                }
                .fw-bold {
                    letter-spacing: 0.5px;
                }
                .logo-img {
                    background-color: white;
                    padding: 6px;
                    border-radius: 10px;
                    display: flex;
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
                    width: 250px;
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
    )
}

export default Header;