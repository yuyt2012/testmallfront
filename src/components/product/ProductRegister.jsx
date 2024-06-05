// src/components/admin/ProductRegister.jsx
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/product/ProductRegister.css';
import {getCategories} from '../api/CategoryRegisterAPI.jsx';
import {saveProduct} from '../api/ProductSaveAPI.jsx';

const ProductRegister = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [childCategory, setChildCategory] = useState('');
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            const fetchedCategories = await getCategories(token);
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const handleParentCategoryChange = (e) => {
        console.log(e.target.value);
        setParentCategory(e.target.value);
        const parentCategory = categories.find(category => category.name === e.target.value);
        console.log(parentCategory);
        setChildCategories(parentCategory ? parentCategory.subCategories : []);
        setChildCategory(''); // 자식 카테고리 초기화
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        setImagePath(e.target.value); // Set the image path
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const productDTO = {
            name,
            price,
            stockQuantity,
            parentCategory,
            childCategory: childCategory.name,
            description
        };

        const json = JSON.stringify(productDTO);
        const blob = new Blob([json], { type: "application/json" }); // Convert JSON string to Blob

        const formData = new FormData(); // Use FormData to send the file
        formData.append('productDTO', blob); // Add the Blob to formData
        formData.append('image', imageFile); // Add the image file

        const product = await saveProduct(formData, token); // Update this to send formData
        if (product) {
            alert('상품 등록 성공');
        } else {
            console.log('상품 등록 실패');
        }
    }

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className="product-register">
            <h1>상품 등록 페이지</h1>
            <Link to="/admin/product-register/category-add" className="admin-button">카테고리 등록</Link>
            <form className="product-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Price:
                    <input type="number" min="0" step="100" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </label>
                <label>
                    Stock Quantity:
                    <input type="number" min="0" value={stockQuantity}
                           onChange={(e) => setStockQuantity(e.target.value)}/>
                </label>
                <label>
                    Parent Category:
                    <select value={parentCategory} onChange={handleParentCategoryChange}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Child Category:
                    <select value={childCategory && childCategory.name}
                            onChange={(e) => {
                                const selectedCategory = childCategories.find(category => category.name === e.target.value);
                                console.log(selectedCategory);
                                setChildCategory(selectedCategory || {});
                            }}>
                        <option value="" disabled selected>---선택하세요---</option>
                        {childCategories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                    Image:
                    <input type="text" value={imagePath} readOnly/> {/* Add text input for the image path */}
                    <input type="file" onChange={handleFileChange}/> {/* Add file input */}
                </label>
                <div className="button-group">
                    <button onClick={handleBack} className="button">뒤로 가기</button>
                    <input type="submit" value="Submit" className="button"/>
                </div>
            </form>
        </div>
    );
};

export default ProductRegister;