// ProductHeader.jsx
import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import '../css/product/ProductHeader.css';

function ProductHeader() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <header className="ProductHeader">
            <nav>
                <ul>
                    <li><Link to="/carts">장바구니</Link></li>
                    <li><Link to="/orders">주문상품확인</Link></li>
                    <li><Link to="/myinfo">내 정보</Link></li>
                    <li onClick={handleBack}>뒤로가기</li>
                </ul>
            </nav>
        </header>
    );
}

export default ProductHeader;