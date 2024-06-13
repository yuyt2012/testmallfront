import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, TextField, Container, Box } from '@material-ui/core';
import {createCategoryWithSubCategories} from "../api/CategoryRegisterAPI.jsx";

function CategoryForm() {
    const [name, setName] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const categoryDTO = {
            name,
            subCategory
        };

        const category = await createCategoryWithSubCategories(categoryDTO, token);
        if (category) {
            alert('등록 성공');
        } else {
            console.log('등록 실패');
        }
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    return (
        <Container style={{position: 'relative', top:'200px'}} maxWidth="sm">
            <Box my={4}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Parent Category" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                    <TextField label="Sub Category" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} fullWidth/>
                    <Button style={{position: 'relative', top: '20px', left: '290px'}} variant="contained" color="primary" type="submit">Add Category</Button>
                    <Button style={{position: 'relative',left: '310px', top: '20px'}} variant="contained" color="secondary" onClick={handleBack}>뒤로 가기</Button>
                </form>
            </Box>
        </Container>
    );
}

export default CategoryForm;