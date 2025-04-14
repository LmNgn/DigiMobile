import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const nav = useNavigate();

  const checkAdminRole = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Kiểm tra nếu có token và vai trò là "admin"
    if (user.role !== "customer") {
      if (window.confirm(
        "Tài khoản của bạn không phải người dùng, bạn có muốn đăng xuất và quay lại trang đăng nhập của client?"
      )) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        message.success("Đã đăng xuất");
        nav("/login");
      } else {
        nav("/admin");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Nếu có token mới kiểm tra vai trò
    if (token) {
      checkAdminRole();
    }
  }, []);

  return (
    <header className="border-bottom">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
