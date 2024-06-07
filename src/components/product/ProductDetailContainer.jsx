// src/components/product/ProductDetailContainer.jsx
import React from 'react';
import ProductDetail from './ProductDetail';
import '../css/product/ProductDetailContainer.css';
import CommonHeader from "../CommonHeader.jsx";

function ProductDetailContainer(props) {

    const links = [
        {text: '장바구니', path: '/carts'},
        {text: '주문상품확인', path: '/orders'},
        {text: '내 정보', path: '/myinfo'},
        {text: '뒤로가기' }, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <div>
            <CommonHeader links={links}/>
            <div className="product-detail-container">
                <ProductDetail {...props} />
            </div>
        </div>
    );
}

export default ProductDetailContainer;