import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/cartContext';
import { Product } from '../../../../types/Product';

const SearchPage = () => {
    const keyword = new URLSearchParams(useLocation().search).get('query') || '';
    const [results, setResults] = useState<Product[]>([]);

    useEffect(() => {
        if (keyword.trim()) {
            axios.get(`http://localhost:3000/products?name_like=${keyword}`)
                .then(res => setResults(res.data))
                .catch(err => console.error("Error fetching search results:", err));
        }
    }, [keyword]);

    const [addingToCart, setAddingToCart] = useState<number | null>(null);
    const { addToCart } = useCart();
    const handleAddToCart = (product: Product) => {
        setAddingToCart(product.id);
        addToCart(product);
        setTimeout(() => setAddingToCart(null), 1000);
      };

    return (
        <div className="container py-4">
    <h4 className="mb-4 text-center text-primary">Kết quả tìm kiếm cho: <strong>{keyword}</strong></h4>
    <div className="row justify-content-center g-4">
        {results.length ? results.map(product => (
            <div key={product.id} className="col-md-4">
                <div className="card shadow-lg h-100 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl border border-light rounded-3">
                    <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <img src={product.images?.[0]?.url} alt={product.name} className="card-img-top img-fluid transition-transform duration-300 ease-in-out hover:scale-110 rounded-top" />
                    <div className="card-body bg-light">
                        <h5 className="card-title text-truncate">{product.name}</h5>
                        <p className="card-text text-primary fw-bold">
                            ${product.price} <del className="text-muted">${product.originalPrice}</del>
                        </p>
                        <div className="d-flex flex-wrap mb-3">
                            {product.colors.map((color, index) => (
                                <span key={index} className="badge me-2 mb-2" style={{ backgroundColor: color }}>
                                    {color}
                                </span>
                            ))}
                        </div>
                        <div className="mb-3">
                            <strong>Bộ nhớ: </strong>{product.storages.join(", ")}
                        </div>
                        <button
                            onClick={() => handleAddToCart(product)}
                            disabled={addingToCart === product.id}
                            className="btn btn-primary w-100 transform transition duration-200 ease-in-out hover:bg-blue-700 hover:scale-105"
                        >
                            {addingToCart === product.id ? "Đang thêm..." : "Mua ngay"}
                        </button>
                    </div>
                    </Link>
                </div>
            </div>
        )) : <p className="text-center w-100">Không tìm thấy sản phẩm nào.</p>}
    </div>
</div>


    );
};

export default SearchPage;
