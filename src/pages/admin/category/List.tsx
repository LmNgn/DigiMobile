import { Category } from "../../../types/Category";
import { useForm } from "react-hook-form";
import { useList } from "../hooks/useList";
import { useCreate } from "../hooks/useCreate";
import { CategoryForm } from "../providers/dataProvider";
import { useDelete } from "../hooks/useDelete";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
function List() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();
  //lấy danh sách danh mục
  const { data: categoryList, refetch } = useList({ resource: "categories" });
  //xóa danh mục
  const { mutate: deleteOne } = useDelete({ resource: "categories" });
  refetch();

  //thêm danh mục
  const { mutate: createOne } = useCreate({ resource: "categories" },);
  const onFinish = (values: any) => {
    if (window.confirm("Xác nhận thêm danh mục?")) {
      const isExist = categoryList?.some((p: CategoryForm) => p.name.toLowerCase() === values.name.toLowerCase());

      if (isExist) {
        message.error("Sản phẩm đã tồn tại!");
        return;
      }
      createOne(values, {
        onSuccess: () => {
          reset();
        }
      })
    }

  }
  return (
    <div className="container-fluid">
      <h1 className="h2">Danh sách danh mục</h1>
      <form className="col-md-12" onSubmit={handleSubmit(onFinish)}>
        <div className="mb-3">
          <h5>Thêm danh mục</h5>
          <input
            placeholder="Nhập tên danh mục"
            type="text"
            className="form-control"
            {...register("name", { required: "Không bỏ trống tên danh mục" })}
          />
          {errors.name && (
            <div className="d-block invalid-feedback">
              {errors.name.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
      {/* Danh sách sản phẩm */}
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.map((c: Category, index: number) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>
                <Link
                  className="btn btn-outline-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#categoryModal"
                  to={`/admin/categories/update/${c.id}`}
                >
                  <i className="fa-circle-info fa-solid" />
                </Link>
                <Popconfirm
                  title="Xóa danh mục"
                  description="Xác nhận xóa danh mục?"
                  onConfirm={() => deleteOne(c.id)}
                  okText="Xác nhận"
                  cancelText="Hủy"
                >
                  <button
                    className="btn btn-outline-danger">
                    <i className="fa-trash fas" />
                  </button>
                </Popconfirm>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
}

export default List;
