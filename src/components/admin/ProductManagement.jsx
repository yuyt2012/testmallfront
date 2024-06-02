// src/components/ProductManagement.jsx
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'; // useHistory import
import '../css/ProductManagement.css';
import {getProductList} from "../api/ProductListAPI.jsx";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // useHistory hook

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const fetchedProducts = await getProductList(10, 0, token); // 첫 페이지의 상품 목록을 가져옵니다.
            if (fetchedProducts && Array.isArray(fetchedProducts.content)) {
                setProducts(fetchedProducts.content);
            } else {
                console.error('fetchedProducts.content is not an array:', fetchedProducts);
            }
        };

        fetchProducts();
    }, []);

    const handleIdClick = (id) => {
        // 상품 수정 폼으로 이동
        navigate(`/product-edit/${id}`);
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    return (
        <div>
            <h1>상품관리 페이지</h1>
            <div className="admin-button-container">
                <button onClick={handleBack}>뒤로가기</button>
                <Link to="/admin/product-register" className="admin-button">상품등록</Link>
            </div>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock Quantity</th>
                    <th>Is Sold Out</th>
                    <th>Parent Category</th>
                    <th>Child Category</th>
                    <th>Description</th>
                    <th>Registration Date</th>
                    <th>Update Date</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td onClick={() => handleIdClick(product.id)}>{product.id}</td>
                        {/* 상품 ID 클릭 이벤트 추가 */}
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stockQuantity}</td>
                        <td>{product.isSoldOut ? 'Yes' : 'No'}</td>
                        <td>{product.parentCategoryName}</td>
                        <td>{product.subCategoryNames.join(', ')}</td>
                        <td>{product.description}</td>
                        <td>{new Date(product.regDate).toLocaleDateString()}</td>
                        <td>{new Date(product.updateDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;