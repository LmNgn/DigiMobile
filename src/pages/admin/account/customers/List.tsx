import { Customers } from "../../../../types/User";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { useList } from "../../hooks/useList";
import { useDelete } from "../../hooks/useDelete";
import { CustomerForm } from "../../providers/dataProvider";
function List() {
  const keyResource = "users";
  const { mutate: deleteOne } = useDelete({ resource: `${keyResource}` });
  const { data: customerList, refetch } = useList({ resource: `${keyResource}` });
  refetch();
  const filteredList = customerList?.filter(
    (admin: CustomerForm) => admin.role && admin.role.startsWith("customer")
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách tài khoản khách hàng</h1>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredList?.map((u: Customers, index: number) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                {u.status ? (
                  <span className="badge text-bg-success">Hoạt động</span>
                ) : (
                  <span className="badge text-bg-secondary">Đình chỉ</span>
                )}
              </td>
              <td>
                <Link
                  className="mx-2 btn btn-outline-primary"
                  to={`/admin/customers/detail/${u.id}`}
                >
                  <i className="fas fa-info-circle" />
                </Link>

                <Popconfirm
                  title="Xóa tài khoản"
                  description="Xác nhận xóa tài khoản?"
                  onConfirm={() => deleteOne(u.id)}
                  okText="Xác nhận"
                  cancelText="Hủy">
                  <button
                    className="btn btn-outline-danger">
                    <i className="fas fa-trash" />
                  </button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
