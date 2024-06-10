// src/components/product/ProductDetailContainer.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import '../css/product/ProductDetailContainer.css';
import CommonHeader from "../CommonHeader.jsx";
import { AuthContext } from '../../contexts/AuthContext.jsx';

function ProductDetailContainer(props) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCartClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/carts');
        }
    };

    const handleOrderCheckClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/orders');
        }
    };

    const handleMyInfoClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/myinfo');
        }
    };

    const links = [
        {text: '장바구니', onClick: handleCartClick},
        {text: '주문상품확인', onClick: handleOrderCheckClick},
        {text: '내 정보', onClick: handleMyInfoClick},
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