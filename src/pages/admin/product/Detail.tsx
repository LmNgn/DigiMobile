import { Link, useParams } from "react-router-dom";
import { useOne } from "../hooks/useOne";
function Detail() {
  const { id } = useParams();
  const { data } = useOne({ resource: "products", id });

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Chi tiết sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/products" className="btn btn-outline-primary">
              Quay lại
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-target="carousel">
            <ol className="carousel-indicators">
              <li data-bs-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
              <li data-bs-target="#carouselExampleIndicators" data-slide-to={1} />
              <li data-bs-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={data?.imageUrl} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={data?.imageUrl} alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://i.imgur.com/RHAnuEI.png" alt="Third slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        {/* <img src={data?.imageUrl} alt={data?.name} /> */}
      </div>
      <div className="col-12 text-center row">
        <div className="col-6">
          <h4 className="my-3">Thông số cơ bản</h4>
          <table className="table w-50 m-auto">
            <thead> </thead>
            <tbody>
              <tr>
                <th>Tên sản phẩm:</th>
                <td>{data?.name}</td>
              </tr>
              <tr>
                <th>Giá sản phẩm:</th>
                <td>{data?.price}</td>
              </tr>
              <tr>
                <th>Số lượng:</th>
                <td>{data?.quantity}</td>
              </tr>
              <tr>
                <th>Tình trạng:</th>
                <td>
                  {data?.inStock ? (
                    <span className="badge text-bg-primary">Còn hàng</span>
                  ) : (
                    <span className="badge text-bg-secondary">Hết hàng</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>Danh mục sản phẩm:</th>
                <td>{data?.category}</td>
              </tr>
              <tr>
                <th>Mô tả:</th>
                <td>{data?.description}</td>
              </tr>
            </tbody>

          </table>
        </div>

        <div className="col-6">
          <h4 className="my-3">Thông số kỹ thuật</h4>
          <table className="w-50 mx-auto table">
            <thead> </thead>
            <tbody>
              <tr>
                <th className="">Màn hình:</th>
                <td className="">
                  <ul className="list-unstyled">
                    <li>Kích thước: {data?.screen?.size ? `${data.screen.size} inch` : "Đang cập nhật"}</li>
                    <li>Độ phân giải: {data?.screen?.size ? `${data.screen.size} inch` : "Đang cập nhật"}</li>
                    <li>Tần số quét: {data?.screen?.size ? `${data.screen.size} inch` : "Đang cập nhật"}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>RAM:</th>
                <td>{data?.ram || "Đang cập nhật"}</td>
              </tr>
              <tr>
                <th>Bộ nhớ:</th>
                <td>
                  {data?.memory || "Đang cập nhật"}
                </td>
              </tr>
              <tr>
                <th>Hệ điều hành:</th>
                <td>{data?.os || "Đang cập nhật"}</td>
              </tr>
              <tr>
                <th>Pin:</th>
                <td>{data?.battery || "Đang cập nhật"}</td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Detail;
