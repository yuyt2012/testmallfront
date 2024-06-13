// src/components/admin/ProductRegister.jsx
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getCategories} from '../api/CategoryRegisterAPI.jsx';
import {saveProduct} from '../api/ProductSaveAPI.jsx';
import {TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Box} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";

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
        const blob = new Blob([json], {type: "application/json"}); // Convert JSON string to Blob

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

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <Container style={{position: 'relative', top: '-120px'}} maxWidth="sm">
                <Box my={4}>
                    <div className="product-register">
                        <Button style={{position: 'relative', top: '200px', left: '430px'}} variant="contained" color="primary"
                                component={Link}
                                to="/admin/product-register/category-add">
                            카테고리 등록
                        </Button>
                        <form style={{position: 'relative', top:'250px'}} className="product-form" onSubmit={handleSubmit}>
                            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                            <TextField label="Price" type="number" value={price}
                                       onChange={(e) => setPrice(e.target.value)}
                                       fullWidth/>
                            <TextField label="Stock Quantity" type="number" value={stockQuantity}
                                       onChange={(e) => setStockQuantity(e.target.value)} fullWidth/>
                            <FormControl fullWidth>
                                <InputLabel>Parent Category</InputLabel>
                                <Select value={parentCategory} onChange={handleParentCategoryChange}>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Child Category</InputLabel>
                                <Select
                                    value={childCategory && childCategory.name}
                                    onChange={(e) => {
                                        const selectedCategory = childCategories.find(category => category.name === e.target.value);
                                        setChildCategory(selectedCategory || {});
                                    }}
                                >
                                    <MenuItem value="" disabled>---선택하세요---</MenuItem>
                                    {childCategories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField label="Description" multiline value={description}
                                       onChange={(e) => setDescription(e.target.value)} fullWidth/>
                            <TextField label="Image" type="file" InputLabelProps={{shrink: true}}
                                       onChange={handleFileChange}
                                       fullWidth/>
                            <div className="button-group">
                                <Button style={{position: 'relative', left: '350px', top: '20px'}} variant="contained"
                                        color="primary" onClick={handleBack}>뒤로 가기</Button>
                                <Button style={{position: 'relative', left: '370px',top: '20px'}} variant="contained" color="primary"
                                        type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Container>
        </>
    );
};

export default ProductRegister;