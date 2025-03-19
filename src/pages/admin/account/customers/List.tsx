import axios from "axios";
import { Role, UserAuth } from "../../../../types/User";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
function List() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  // lấy danh sách
  const getAllUser = async () => {
    const { data } = await axios.get(`http://localhost:3000/users`);
    return data.filter((user: UserAuth) => user.role === Role.USER);
  }

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser
  })

  //xoá
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      if (window.confirm("Xác nhận xóa tài khoản?")) {
        return await axios.delete(`http://localhost:3000/users/${id}`);
      }
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Xóa thất bại.");
    },
  });

 
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách tài khoản khách hàng</h1>
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
          {data?.map((u: UserAuth, index: number) => (
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
                  className="btn btn-outline-primary me-1"
                  to={`/admin/account/customer/detail/${u.id}`}
                >
                  <i className="fas fa-info-circle" />
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUserMutation.mutate(u.id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
