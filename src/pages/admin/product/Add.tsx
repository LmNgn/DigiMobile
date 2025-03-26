import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreate } from "../hooks/useCreate";
import { useList } from "../hooks/useList";
import { Category } from "../../../types/Category";
type RegisterInput = {
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
};
const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>();
  const { data: categories } = useList({ resource: "categories" });
  const { mutate } = useCreate({ resource: "products" });
  const onFinish = (values: any) => {
    mutate(values);
  };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/product" className="btn btn-outline-primary">
              Quay lại
            </Link>
          </div>
        </div>
      </div>

      <form className="offset-2 col-md-8 " onSubmit={handleSubmit(onFinish)}>
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
              {categories?.map((c: Category) => (
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
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
