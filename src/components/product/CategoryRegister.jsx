import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/admin/CategoryRegister.css';
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
        <form onSubmit={handleSubmit}>
            <div className="form-title">
                <div className="form-group">
                    <label>
                        Parent Category:&nbsp;
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Sub Category:&nbsp;
                        <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}/>
                    </label>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Category"/>
                </div>
                <div className="form-group">
                    <button onClick={handleBack}>뒤로 가기</button>
                </div>
            </div>
        </form>
    );
}

export default CategoryForm;