import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOne } from "../hooks/useOne";
import { useUpdate } from "../hooks/useUpdate";
import { ProductForm } from "../providers/dataProvider";

const UpdateCategory = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { data: category } = useOne({ resource: "categories", id });
    const { mutate } = useUpdate({ resource: "categories", id });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductForm>();

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
            });
        }
    }, [category]);

    const onFinish = (values: ProductForm) => {
        if (window.confirm("Xác nhận cập nhập thông tin sản phẩm?")) {
            mutate(values, {
                onSuccess: () => {
                    nav("/admin/categories");
                }
            });
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Cập nhật thông tin danh mục</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <Link to="/admin/categories" className="btn btn-outline-primary">
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>

            <form className="offset-2 col-md-8" onSubmit={handleSubmit(onFinish)}>
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
                <div className="row mx-auto">
                    <div className="col-sm-10 offset-2">
                        <button type="submit" className="btn btn-primary">
                            Sửa danh mục
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategory;
