import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
function Layout() {
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary"
                        style={{ height: "100vh" }}
                    >
                        <div
                            className="offcanvas-md offcanvas-end bg-body-tertiary"
                            tabIndex={-1}
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                                    Demo
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link d-flex align-items-center gap-2 active"
                                            to="/"
                                        >
                                            <i className="fas fa-box" />
                                            Sản phẩm
                                        </Link>
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
    )
}

export default Layout