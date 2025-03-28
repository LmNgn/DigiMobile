import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="text-center m-auto">
            <h1 className="fs-1">404 - Not found</h1>
            <Link className="btn btn-primary" to={'/admin'}><i className="mx-2 fa-solid fa-house" />
                Về trang chủ</Link>
        </div>
    )
}

export default NotFound