import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useOne } from "../../hooks/useOne";
import { useUpdate } from "../../hooks/useUpdate";
import { CustomerForm } from "../../providers/dataProvider";
type statusUpdate = {
  status: boolean;
};
function Detail() {
  const { register, handleSubmit, reset, watch } = useForm<statusUpdate>();

  const nav = useNavigate();
  const { id } = useParams();
  const { data: customer } = useOne({ resource: "customers", id });
  const { mutate } = useUpdate({ resource: "customers", id })
  const onFinish = (values: CustomerForm) => {
    if (window.confirm("Xác nhận cập nhập thông tin tài khoản?")) {
      mutate(values, {
        onSuccess: () => {
          nav("/admin/customers");
        }
      });
    }
  };
  useEffect(() => {
    if (customer) {
      reset({
        status: customer.status,
      });
    }
  }, [customer]);
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Chi tiết tài khoản:</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link
              to="/admin/customers"
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
            alt={customer?.username}
          />
        </div>
        <div className="col-8">
          <form
            className="form-check form-switch"
            onSubmit={handleSubmit(onFinish)}
          >
            <table className="table table-borderless">
              <thead></thead>
              <tbody>
                <tr>
                  <th>Tên tài khoản:</th>
                  <td>{customer?.username}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{customer?.email}</td>
                </tr>
                <tr>
                  <th>Số điện thoại:</th>
                  <td>{customer?.phone}</td>
                </tr>
                <tr>
                  <th>Địa chỉ:</th>
                  <td>{customer?.address}</td>
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
