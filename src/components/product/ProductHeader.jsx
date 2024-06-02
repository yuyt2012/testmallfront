// ProductHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ProductHeader.css';

function ProductHeader() {
  return (
    <header className="ProductHeader">
      <nav>
        <ul>
          <li><Link to="/cart">장바구니</Link></li>
          <li><Link to="/orders">주문상품확인</Link></li>
          <li><Link to="/myinfo">내 정보</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default ProductHeader;