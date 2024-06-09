// src/components/order/Order.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import ProductContext from "../../contexts/ProductContext.jsx";
import { getProduct } from "../api/ProductGetAPI.jsx";

function Order() {
    const { id } = useParams();
    const location = useLocation();
    const { orderProducts: contextProducts = [] } = useContext(ProductContext); // Get multiple products from the context
    const [products, setProducts] = useState(contextProducts);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const fetchedProduct = await getProduct(id, token);
                setProducts([fetchedProduct]); // Set a single product
            };

            fetchProduct();
        } else {
            // 장바구니에서 넘어온 경우, ProductContext에서 여러 상품의 정보를 가져옵니다.
            setProducts(contextProducts);
        }
    }, [id, token, contextProducts]);

    if (products.length > 0) {
        return (
            <div>
                <h1>{id ? '상품 상세 페이지에서 넘어온 경우' : '장바구니에서 넘어온 경우'}</h1>
                <h2>상품 정보</h2>
                {products.map((product, index) => (
                    <p key={index}>{product.name} - {product.quantity}개</p>
                ))}

                <h2>주문자 정보</h2>
                <TextField label="이름" variant="outlined"/>
                <TextField label="전화번호" variant="outlined"/>
                <TextField label="주소" variant="outlined"/>

                <h2>결제 방법</h2>
                <RadioGroup>
                    <FormControlLabel value="card" control={<Radio/>} label="카드"/>
                    <FormControlLabel value="bank" control={<Radio/>} label="무통장 입금"/>
                    <FormControlLabel value="kakao" control={<Radio/>} label="카카오페이"/>
                </RadioGroup>

                <Button variant="contained" color="primary">주문하기</Button>
                <Button variant="contained" color="secondary">취소</Button>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default Order;