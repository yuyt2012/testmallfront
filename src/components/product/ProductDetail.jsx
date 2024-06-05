// src/components/product/ProductDetail.jsx
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getProduct} from '../api/ProductGetAPI.jsx';
import {fetchImage} from '../api/ImageAPI.jsx';
import '../css/product/ProductDetail.css';
import {addToCart} from "../api/CartAPI.jsx";

function ProductDetail() {
    const {id} = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState(null); // Add this line
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(id, token); // Fetch the product
            setProduct(fetchedProduct); // Set the product

            // Fetch the image
            if (fetchedProduct.imageUrl) {
                const filename = fetchedProduct.imageUrl.split('/').pop(); // Extract filename from imageUrl
                let encodedFilename = encodeURIComponent(filename);
                const fetchedImage = await fetchImage(encodedFilename, token);
                fetchedProduct.image = fetchedImage; // Set the fetched image to the product
            }

            setProduct(fetchedProduct); // Set the product
        };
        fetchProduct();
    }, [id, token]);

    if (!product) {
        return <div>Loading...</div>; // Show a loading message while the product is being fetched
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handlePurchase = () => {
        // Implement purchase functionality here
    };

    const handleAddToCart = async () => {
        const userConfirmed = window.confirm('장바구니에 등록 하시겠습니까?');
        if (userConfirmed) {
            try {
                await addToCart(product.id, quantity, email, token);
                alert('장바구니에 상품이 추가되었습니다.');
                setQuantity(1); // Reset quantity to 1 after successful add to cart
            } catch (error) {
                alert('장바구니 추가에 실패했습니다.');
            }
        }
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <div className="product-detail-left">
                    <img src={product.image} alt={product.name}/> {/* Use the fetched image */}
                </div>
                <div className="product-detail-right">
                    <h2>{product.name}</h2>
                    <p>Price: {product.price}</p>
                    <input type="number" value={quantity} onChange={handleQuantityChange} min="1"/>
                    <br/>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handlePurchase}>Purchase</button>
                    <br/>
                    <p>Total: {product.price * quantity}</p>
                </div>
            </div>
            <div className="product-detail-description">
                <p>{product.description}</p>
            </div>
        </div>
    );
}

export default ProductDetail;