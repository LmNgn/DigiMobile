import axios from "axios";
import { Category } from "../../../types/Category";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type AddInput = {
  name: string;
};

type UpdateInput = {
  name2: string;
};

function List() {
  const nav = useNavigate()
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm<UpdateInput>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInput>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [sid, setSid] = useState<number | null>(null);

  const getOneCategoryById = async (id: number) => {
    try {
      setSid(id);
      const { data } = await axios.get(`http://localhost:3000/categories/${id}`);
      resetUpdate({ name2: data.name });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate: SubmitHandler<UpdateInput> = async (data) => {
    try {
      if (window.confirm("Xác nhận lưu thông tin?")) {
        await axios.put(`http://localhost:3000/categories/${sid}`, { name: data.name2 });
        toast.success("Lưu thành công!");
        getList();
      }
    } catch (error) {
      toast.error("Lưu thất bại.");
    }
  };

  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/categories");
      setCategories(data);
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục.");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      if (window.confirm("Xác nhận xóa danh mục?")) {
        await axios.delete(`http://localhost:3000/categories/${id}`);
        toast.success("Xóa thành công!");
        getList();
      }
    } catch (error) {
      toast.error("Xóa thất bại.");
    }
  };

  const onSubmit: SubmitHandler<AddInput> = async (data) => {
    try {
      if (window.confirm("Xác nhận thêm danh mục?")) {
        await axios.post(`http://localhost:3000/categories`, data);
        toast.success("Thêm danh mục thành công!");
        getList();
      }
    } catch (error) {
      toast.error("Thêm danh mục thất bại.");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="h2">Danh sách danh mục</h1>

      <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <h5>Thêm danh mục</h5>
          <input
            placeholder="Nhập tên danh mục"
            type="text"
            className="form-control"
            {...register("name", { required: "Không bỏ trống tên danh mục" })}
          />
          {errors.name && (
            <div className="invalid-feedback d-block">{errors.name.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Thêm</button>
      </form>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-outline-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#categoryModal"
                  onClick={() => getOneCategoryById(c.id)}
                >
                  <i className="fa-solid fa-circle-info" />
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteCategory(c.id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className="modal fade" id="categoryModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thông tin</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <form onSubmit={handleSubmitUpdate(onUpdate)}>
              <div className="modal-body">
                <div className="mb-3 row">
                  <label htmlFor="name2" className="col-sm-2 col-form-label text-end">
                    Tên:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name2"
                      {...registerUpdate("name2", {
                        required: "Không bỏ trống trường này",
                      })}
                    />
                    {errorsUpdate.name2 && (
                      <div className="invalid-feedback d-block">
                        {errorsUpdate.name2.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
