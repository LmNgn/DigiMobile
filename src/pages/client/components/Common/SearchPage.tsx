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
        <div className="container py-5">
  <h4 className="mb-4 text-center text-primary fs-4">
    Kết quả tìm kiếm cho: <strong className="text-dark">{keyword}</strong>
  </h4>

  <div className="row justify-content-center g-4">
    {results.length ? (
      results.map(product => (
        <div key={product.id} className="col-md-4">
          <div className="card shadow-lg h-100 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border-0 rounded-3 overflow-hidden">
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="card-img-top img-fluid transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </Link>
            <div className="card-body bg-white p-4">
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <h5 className="card-title text-truncate">{product.name}</h5>
              </Link>
              <p className="card-text text-primary fw-bold mb-2">
                ${product.price}{" "}
                <del className="text-muted">${product.originalPrice}</del>
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={addingToCart === product.id}
                className="btn btn-primary w-100 transform transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
              >
                {addingToCart === product.id ? "Đang thêm..." : "Mua ngay"}
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center w-100 text-muted">Không tìm thấy sản phẩm nào.</p>
    )}
  </div>
</div>




    );
};

export default SearchPage;
