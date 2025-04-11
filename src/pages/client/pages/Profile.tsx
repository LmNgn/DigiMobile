import MyOrders from "./MyOrders";
import { useUser } from "../context/userContext";
const Profile = () => {
  const { user, logout, loading } = useUser();

  if (loading) return <p>Đang tải thông tin người dùng...</p>;
  if (!user) return <p>Bạn chưa đăng nhập.</p>;

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container flex-grow-1 py-4 py-md-6">
        <div className="row g-4">
          {/* Profile Sidebar */}
          <div className="col-12 col-md-4 col-lg-3 shadow-sm rounded p-4">
            <h1 className="fs-3 fw-bold mb-3">User #{user.id}</h1>
            <p className="fs-5 text-muted mb-3">{user.email}</p>
            <button className="btn btn-danger w-100" onClick={logout}>
              Đăng xuất
            </button>
          </div>

          {/* Orders Section */}
          <div className="col-12 col-md-8 col-lg-9">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
