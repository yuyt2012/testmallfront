// Product.jsx
import React, {useState, useEffect, useRef} from 'react';
import '../../components/css/Product.css';
import ProductHeader from './ProductHeader.jsx'
import {getCategories} from "../api/CategoryRegisterAPI.jsx";
import {findAll} from "../api/ProductListAPI.jsx";

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Add this state

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            const token = localStorage.getItem('token');
            const fetchedProducts = await findAll(token);
            console.log('Fetched products:', fetchedProducts); // Add this line
            const fetchedCategories = await getCategories(token);
            console.log('Fetched categories:', fetchedCategories); // Add this line
            setProducts(fetchedProducts);
            setCategories(fetchedCategories);
        };

        fetchProductsAndCategories();
    }, []);

    const handleCategoryClick = (category) => {
        console.log('Category clicked:', category.name); // Add this line
        setSelectedCategory(category.name);
        setSelectedSubCategory(null);
    };

    const handleSubCategoryClick = (subCategory) => {
        console.log('Subcategory clicked:', subCategory.name); // Add this line
        setSelectedSubCategory(subCategory.name);
    };

    return (
        <div className="Product">
            <ProductHeader/>
            {categories.map(category => (
                <div key={category.id}>
                    <h2 onClick={() => handleCategoryClick(category)}>{category.name}</h2>
                    {selectedCategory === category.name && category.subCategories.map(subCategory => (
                        <h3 key={subCategory.id}
                            onClick={() => handleSubCategoryClick(subCategory)}>{subCategory.name}</h3>
                    ))}
                    <div className="product-list">
                        {products.filter(product => {
                            console.log('Product:', product); // Add this line
                            const matchesCategory = product.categoryName === category.name;
                            console.log('Matches category:', matchesCategory); // Add this line
                            const matchesSubCategory = !selectedSubCategory || product.subCategoryNames.includes(selectedSubCategory);
                            console.log('Matches subcategory:', matchesSubCategory); // Add this line
                            const matchesFilter = matchesCategory && matchesSubCategory;
                            if (matchesFilter) {
                                console.log('Filtered product:', product.name); // Add this line
                            }
                            return matchesFilter;
                        }).map(product => (
                            <div key={product.id}>
                                <img src={`http://localhost:8080/${product.imageUrl}`} alt={product.name}/>
                                <div>{product.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Product;