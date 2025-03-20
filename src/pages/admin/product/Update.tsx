import axios from "axios";
import { Category } from "../../../types/Category";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type UpdateInput = {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
};
const UpdateProduct = () => {
  // lấy danh sách danh mục
  const [categories, setCategories] = useState<Category[]>([]);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/categories`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateInput>();

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    getAllCategory();
    fetchData(id);
  }, [id]);
  const fetchData = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      reset({
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        category: data.category,
        inStock: data.inStock,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nav = useNavigate();
  const onSubmit: SubmitHandler<UpdateInput> = async (data) => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, data);
      toast.success("Sửa sản phẩm thành công");
      nav("/admin/product");
    } catch (error) {
      toast.error("Vui lòng kiểm tra lại thông tin");
      console.log(error);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Cập nhật thông tin sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/product" className="btn btn-outline-primary">
              Quay lại
            </Link>
          </div>
        </div>
      </div>

      <form className="offset-2 col-md-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label text-end">
            Tên sản phẩm
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              {...register("name", { required: "Không bỏ trống tên" })}
            />
            {errors.name && (
              <div className="invalid-feedback d-block">
                {errors.name.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="price" className="col-sm-2 col-form-label text-end">
            Giá
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="price"
              {...register("price", {
                required: "Không bỏ trống tên",
                min: {
                  value: 0,
                  message: "Gía sản phẩm phải lớn hơn 0.",
                },
              })}
            />
            {errors.price && (
              <div className="invalid-feedback d-block">
                {errors.price.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="imageUrl" className="col-sm-2 col-form-labe text-end">
            URL Hình ảnh
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              {...register("imageUrl", {
                required: "Không bỏ trống trường này",
              })}
            />
            {errors.imageUrl && (
              <div className="invalid-feedback d-block">
                {errors.imageUrl.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-2 text-end">Tình trạng</div>
          <div className="col-sm-10">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                {...register("inStock")}
              />
              <span>{watch("inStock") ? "Còn hàng" : "Hết hàng"}</span>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="category"
            className="col-sm-2 col-form-label text-end"
          >
            Danh mục
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id="category"
              {...register("category")}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((c: Category) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-10 offset-2">
            <button type="submit" className="btn btn-primary">
              Sửa sản phẩm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
