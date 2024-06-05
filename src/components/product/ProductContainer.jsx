// ProductContainer.jsx
import React from 'react';
import {useNavigate} from "react-router-dom";
import ProductDisplay from './ProductDisplay';
import '../css/product/ProductContainer.css';

function ProductContainer(props) {
    return (
        <div className="product-container">
            <ProductDisplay {...props} />
        </div>
    );
}

export default ProductContainer;