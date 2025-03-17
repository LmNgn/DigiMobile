import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Header() {
    const nav = useNavigate();
    const handleLogout = () => {
        const confirm = window.confirm("Bạn muốn đăng xuất ?");
        if (!confirm) return;
        localStorage.removeItem("token");
        toast.success("Đăng xuất thành công!");
        nav('/login');
    };
    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <h2>
                <a className="p-3 navbar-brand col-sm-3 col-md-2 mr-0" href="/admin">DigiMobile</a>
            </h2>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <a className="nav-link" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt" />
                    </a>
                </li>
            </ul>
        </nav>

    )
}

export default Header;