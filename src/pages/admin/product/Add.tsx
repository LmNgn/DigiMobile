import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreate } from "../hooks/useCreate";
import { useList } from "../hooks/useList";
import { Category } from "../../../types/Category";
import { ProductForm } from "../providers/dataProvider";
import { message } from "antd";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductForm>();

  const { data: categories } = useList({ resource: "categories" });
  const { data: productList } = useList({ resource: "products" });
  const { mutate } = useCreate({ resource: "products" });

  const onFinish = (values: any) => {
    const isExist = productList?.some(
      (p: ProductForm) => p.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isExist) {
      message.error("Sản phẩm đã tồn tại!");
      return;
    }
    mutate(values);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/products" className="btn btn-outline-primary">
              Quay lại
            </Link>
          </div>
        </div>
      </div>

      <form className="offset-2 col-md-8 " onSubmit={handleSubmit(onFinish)}>
        <div className="mb-3 row">
          <h5 className="text-center mb-3">Thông tin cơ bản</h5>
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
                required: "Không bỏ trống giá",
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
          <label
            htmlFor="quantity"
            className="col-sm-2 col-form-label text-end"
          >
            Số lượng
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="quantity"
              {...register("quantity", {
                required: "Không bỏ trống số lượng",
                min: {
                  value: 0,
                  message: "Số lượng sản phẩm phải lớn hơn 0.",
                },
              })}
            />
            {errors.quantity && (
              <div className="invalid-feedback d-block">
                {errors.quantity.message}
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
              <span>{watch("inStock") ? "Còn hàng" : "Hết hàng "}</span>
            </div>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="category" className="col-sm-2 col-form-label text-end">
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
          <label htmlFor="description" className="col-sm-2 col-form-label text-end">
            Mô tả
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <h5 className="text-center mb-3">Thông số kỹ thuật</h5>

        <div className="mb-3 row">
          <label htmlFor="screenSize" className="col-sm-2 col-form-label text-end">
            Màn hình
          </label>
          <div className="col-sm-3">
            <input
              type="number"
              className="form-control"
              id="screenSize"
              placeholder="Kích thước (inch)"
              {...register("screen.size")}
            />
          </div>
          <div className="col-sm-4">
            <select
              className="form-control"
              {...register("screen.resolution")}
            >
              <option value="">Độ phân giải</option>
              <option value="HD">HD</option>
              <option value="HD+">HD+</option>
              <option value="2K">QHD (2K)</option>
              <option value="4K">4K</option>
            </select>
          </div>
          <div className="col-sm-3">
            <select
              className="form-control"
              {...register("screen.rate")}
            >
              <option value="">Tần số quét</option>
              <option value="60">60Hz</option>
              <option value="90">90Hz</option>
              <option value="120">120Hz</option>
              <option value="144">144Hz</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="ram" className="col-sm-2 col-form-label text-end">
            RAM
          </label>
          <div className="col-sm-10">
            <select className="form-control" id="ram" {...register("ram")}>
              <option value="">Chọn thông số</option>
              <option value="4">4GB</option>
              <option value="6">6GB</option>
              <option value="8">8GB</option>
              <option value="12">12GB</option>
              <option value="24">24GB</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="memory" className="col-sm-2 col-form-label text-end">
            Bộ nhớ
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id="memory"
              {...register("memory")}
            >
              <option value="">Chọn thông số</option>
              <option value="32">32GB</option>
              <option value="64">64GB</option>
              <option value="128">128GB</option>
              <option value="256">256GB</option>
              <option value="512">512GB</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="battery" className="col-sm-2 col-form-label text-end">
            Pin (mAh)
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="battery"
              {...register("battery")}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-sm-10 offset-8">
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
