// src/components/product/ProductDetailContainer.jsx
import React from 'react';
import ProductDetail from './ProductDetail';
import '../css/product/ProductDetailContainer.css';
import ProductHeader from "./ProductHeader.jsx";

function ProductDetailContainer(props) {
    return (
        <div>
            <ProductHeader/>
            <div className="product-detail-container">
                <ProductDetail {...props} />
            </div>
        </div>
    );
}

export default ProductDetailContainer;