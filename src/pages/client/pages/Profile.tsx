import MyOrders from "./MyOrders";

const Profile = () => {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <div className="container flex-grow-1 py-4 py-md-6">
          <div className="row g-4">
            {/* Profile Sidebar */}
            <div className="col-12 col-md-4 col-lg-3 shadow-sm rounded p-4">
              <h1 className="fs-3 fw-bold mb-3">Minh Khoi</h1>
              <p className="fs-5 text-muted mb-3">khoi30@gmaill.com</p>
              <button className="btn btn-danger w-100">Logout</button>
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
  