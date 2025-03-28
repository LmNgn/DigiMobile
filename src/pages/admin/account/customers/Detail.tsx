import axios from "axios";
import { UserAuth } from "../../../../types/Customers";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
type statusUpdate = {
  status: boolean;
};
function Detail() {
  const { register, handleSubmit, reset, watch } = useForm<statusUpdate>();

  const nav = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<UserAuth | undefined>();
  const getDetail = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      reset({
        status: data.status,
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<statusUpdate> = async (data) => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, data);
      toast.success("Cập nhật trạng thái thành công");
      nav("/admin/account/customers");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại.");
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
          <form
            className="form-check form-switch"
            onSubmit={handleSubmit(onSubmit)}
          >
            <table className="table table-borderless">
              <thead></thead>
              <tbody>
                <tr>
                  <th>Tên tài khoản:</th>
                  <td>{user?.username}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <th>Số điện thoại:</th>
                  <td>{user?.phone}</td>
                </tr>
                <tr>
                  <th>Địa chỉ:</th>
                  <td>{user?.address}</td>
                </tr>
                <tr>
                  <th>Trạng thái:</th>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      {...register("status")}
                    />
                    <span>{watch("status") ? "Hoạt động" : "Đình chỉ"}</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="col-sm-12 d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary">
                        Cập nhật trạng thái
                      </button>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Detail;
