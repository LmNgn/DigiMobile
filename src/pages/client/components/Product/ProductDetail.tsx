import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const selectedProduct = {
    name: "Iphone",
    price: 120,
    description: "This is a smartphone",
    brand: "Apple",
    color: ["Black", "White"],
    images: [
        {
            url: "https://picsum.photos/id/237/200/300",
            altText: "Iphone 12",
        },
        {
            url: "https://picsum.photos/id/237/200/300",
            altText: "Iphone 11",
        }
    ]
};

const ProductDetail = () => {
    const [mainImage, setMainImage] = useState("");
    const [selectedColor,setSelectedColor] = useState("");
    const [quantity,setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const handleQuantityChange = (action) =>{
        if(action==="plus") setQuantity((prev)=>prev+1);
        if(action==="minus" && quantity>1) setQuantity((prev)=>prev-1);
    }
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, []);

    return (
        <div className="container py-5">
            <div className="card p-4 shadow">
                <div className="row">
                    <div className="col-md-3 d-flex flex-column gap-2">
                        {selectedProduct.images.map((image, index) => (
                            <img 
                                key={index} 
                                src={image.url} 
                                alt={image.altText || `Thumbnail ${index}`} 
                                className="img-thumbnail cursor-pointer" 
                                onClick={() => setMainImage(image.url)}
                                style={{ cursor: 'pointer', width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        ))}
                    </div>
                    <div className="col-md-6 text-center">
                        <img src={mainImage} alt="Main Product" className="img-fluid rounded w-100" style={{ maxHeight: '400px', objectFit: 'contain' }} />
                    </div>
                    <div className="col-md-3">
                        <h1 className="h3 mb-2">{selectedProduct.name}</h1>
                        <p className="text-muted text-decoration-line-through">
                            {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
                        </p>
                        <p className="h4 text-danger">${selectedProduct.price}</p>
                        <p>{selectedProduct.description}</p>
                        <div className="mb-3">
                            <strong>Color:</strong>
                            <div className="d-flex mt-2 gap-2">
                                {selectedProduct.color.map((color) => (
                                    <span 
                                        key={color}
                                        onClick={()=>setSelectedColor(color)}
                                        className={`border rounded-circle d-inline-block ${selectedColor === color}`} 
                                        style={{ backgroundColor: color.toLowerCase(), width: '30px', height: '30px' }}
                                    ></span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <strong>Quantity:</strong>
                            <div className="d-flex align-items-center mt-2">
                                <button onClick={()=>handleQuantityChange("minus")} className="btn btn-outline-secondary">-</button>
                                <span className="mx-3">{quantity}</span>
                                <button onClick={()=>handleQuantityChange("plus")} className="btn btn-outline-secondary">+</button>
                            </div>
                        </div>
                        <button className="btn btn-dark w-100">Add To Cart</button>
                        <div className="mt-4">
                            <h4 className="h5">Characteristics:</h4>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Brand</td>
                                        <td>{selectedProduct.brand}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;