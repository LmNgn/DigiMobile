import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
function Detail() {
    const { id } = useParams();
    const getOne = async (id: string | number) => {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        return data
    }
    const { data: product } = useQuery({
        queryKey: ["products"],
        queryFn: () => getOne(id!),
        enabled: !!id //chỉ fetch khi có id
    })
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Chi tiết sản phẩm</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <Link to="/admin/product" className="btn btn-outline-primary">
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <img src={product?.imageUrl} alt={product?.name} />
                </div>
                <div className="col-8">
                    <table className="table table-borderless">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>Tên sản phẩm:</th>
                                <td>{product?.name}</td>
                            </tr>
                            <tr>
                                <th>Giá sản phẩm:</th>
                                <td>{product?.price}</td>
                            </tr>
                            <tr>
                                <th>Tình trạng:</th>
                                <td>{(product?.inStock) ?
                                    (<span className="badge text-bg-primary">Còn hàng</span>)
                                    : (<span className="badge text-bg-secondary">Hết hàng</span>)
                                }
                                </td>
                            </tr>
                            <tr>
                                <th>Danh mục sản phẩm:</th>
                                <td>{product?.category}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Detail