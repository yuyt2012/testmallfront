// Product.jsx
import React, {useState, useEffect, useRef} from 'react';
import '../../components/css/Product.css';
import ProductHeader from './ProductHeader.jsx'
import {getCategories} from "../api/CategoryRegisterAPI.jsx";

function Product() {
    const [parentCategories, setParentCategories] = useState([]); // Add state for parent categories
    const [childCategories, setChildCategories] = useState({}); // Change this to an object
    const [selectedCategory, setSelectedCategory] = useState(null); // Add this state
    const categoryRef = useRef(null); // Add this ref

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            const categories = await getCategories(token); // Fetch categories
            setParentCategories(categories); // Set parent categories
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (category, event) => {
        if (selectedCategory === category) {
            setSelectedCategory(null); // Unselect the category
            setChildCategories(prevState => ({
                ...prevState,
                [category.id]: null // Remove the child categories for this parent category
            }));
        } else {
            setSelectedCategory(category); // Select the category
            setChildCategories({ // Reset all child categories
                [category.id]: category.subCategories // Update the child categories for this parent category
            });
            categoryRef.current.style.left = `${event.target.getBoundingClientRect().width}px`; // Set the left style dynamically
        }
    };

    return (
        <div className="Product">
            <ProductHeader/>
            <div className="product-list visible">
                {parentCategories.map(category => ( // Render parent categories
                    <div key={category.id} onClick={(event) => handleCategoryClick(category, event)}>
                        {category.name}
                        <div ref={categoryRef} className={`child-category-list ${childCategories[category.id] ? 'visible' : ''}`}>
                            {childCategories[category.id]?.map(childCategory => ( // Render child categories for this parent category
                                <div key={childCategory.id} onClick={() => handleCategoryClick(childCategory)}>
                                    {childCategory.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;