// Product.jsx
import React, {useState, useEffect, useRef} from 'react';
import '../css/product/Product.css';
import ProductHeader from './ProductHeader.jsx'
import {getCategories} from "../api/CategoryRegisterAPI.jsx";
import ProductContainer from "./ProductContainer.jsx";

function Product() {
    const [parentCategories, setParentCategories] = useState([]); // Add state for parent categories
    const [childCategories, setChildCategories] = useState({}); // Change this to an object
    const [selectedParentCategory, setSelectedParentCategory] = useState('의류');
    const [selectedChildCategory, setSelectedChildCategory] = useState(null); // Add this state
    const categoryRef = useRef(null); // Add this ref

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            const categories = await getCategories(token); // Fetch categories
            setParentCategories(categories); // Set parent categories
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (category, event, isChildCategory = false) => {
        if (isChildCategory) {
            if (selectedChildCategory === category.name) {
                setSelectedChildCategory(null);
            } else {
                setSelectedChildCategory(category.name);
            }
        } else {
            if (selectedParentCategory === category.name) {
                // Do nothing when the parent category is clicked again
                return;
            } else {
                setSelectedParentCategory(category.name);
                setSelectedChildCategory(null);
                setChildCategories({
                    [category.id]: category.subCategories
                });
                console.log(category.subCategories);
            }
        }
        categoryRef.current.style.left = `${event.target.getBoundingClientRect().width}px`;

        // Stop event propagation for child category click events
        if (isChildCategory) {
            event.stopPropagation();
        }
    };

    useEffect(() => {
        console.log('Selected child category:', selectedChildCategory);
    }, [selectedChildCategory]);

    return (
        <div className="Product">
            <ProductHeader/>
            <div className="product-list visible">
                {parentCategories.map(category => (
                    // Render parent categories
                    <div key={category.id} onClick={(event) => handleCategoryClick(category, event)}>
                        {category.name}
                        <div ref={categoryRef} className={`child-category-list ${childCategories[category.id] ? 'visible' : ''}`}>
                            {childCategories[category.id]?.map(childCategory => ( // Render child categories for this parent category
                                <div key={childCategory.id}
                                     onClick={(event) => handleCategoryClick(childCategory, event, true)}>
                                    {childCategory.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <ProductContainer selectedParentCategory={selectedParentCategory} selectedChildCategory={selectedChildCategory} />
        </div>
    );
}

export default Product;