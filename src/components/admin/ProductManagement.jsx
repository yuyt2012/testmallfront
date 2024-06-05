// src/components/ProductManagement.jsx
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'; // useHistory import
import '../css/product/ProductManagement.css';
import {getProductList} from "../api/ProductGetAPI.jsx";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Add a state variable for the total pages
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const fetchedProducts = await getProductList(10, page, token);
            if (fetchedProducts && Array.isArray(fetchedProducts.content)) {
                setProducts(fetchedProducts.content);
                setTotalPages(fetchedProducts.totalPages); // Update the total pages
            } else {
                console.error('fetchedProducts.content is not an array:', fetchedProducts);
            }
        };

        fetchProducts();
    }, [page]); // Add page as a dependency here

    const handleIdClick = (id) => {
        navigate(`/product-edit/${id}`);
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) { // Check if there is a next page
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        setPage(page - 1); // Decrease the current page
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
            <div className="admin-button-container">
                <button onClick={handleBack}>뒤로가기</button>
                <button onClick={handlePreviousPage} disabled={page === 0}>이전 페이지</button>
                <button onClick={handleNextPage} disabled={page >= totalPages - 1}>다음 페이지</button>
            </div>
        </div>
    );
};

export default ProductManagement;