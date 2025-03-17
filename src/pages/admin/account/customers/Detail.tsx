import axios from "axios";
import { UserAuth } from "../../../../types/User";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [user, setUser] = useState<UserAuth | undefined>();
  const getDetail = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getDetail(id);
  }, [id]);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Chi tiết tài khoản:</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link
              to="/admin/account/customer"
              className="btn btn-outline-primary"
            >
              Quay lại
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <img
            src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
            alt={user?.username}
          />
        </div>
        <div className="col-8">
          <table className="table table-borderless">
            <thead></thead>
            <tbody>
              <tr>
                <th>Tên tài khoản:</th>
                <td>{user?.username}</td>
              </tr>
              <tr>
                <th>Giá sản phẩm:</th>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <th>Tình trạng:</th>
                <td>
                  {user?.status ? (
                    <span className="badge text-bg-primary">Hoạt động</span>
                  ) : (
                    <span className="badge text-bg-secondary">Đình chỉ</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>Danh mục sản phẩm:</th>
                <td>{user?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Detail;
