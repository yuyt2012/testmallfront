// ProductDisplay.jsx
import React, {useState, useEffect} from "react";
import {findAll} from "../api/ProductGetAPI.jsx";
import { fetchImage } from "../api/ImageAPI.jsx";
import '../css/product/ProductDisplay.css';
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProductDisplay({selectedParentCategory, selectedChildCategory}) {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await findAll(token); // Fetch products
            for (let product of fetchedProducts) {
                const filename = product.imageUrl.split('/').pop(); // Extract filename from imageUrl
                let encodedFilename = encodeURIComponent(filename);
                product.image = await fetchImage(encodedFilename, token);
            }
            setProducts(fetchedProducts); // Set products
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        if (selectedChildCategory) {
            // Check if the product's subCategoryNames array includes the selectedChildCategory
            return product.subCategoryNames.includes(selectedChildCategory);
        } else if (selectedParentCategory) {
            return product.parentCategoryName === selectedParentCategory;
        } else {
            return true;
        }
    });

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    }

    console.log(filteredProducts);

    return (
        <div className="product-table">
            {filteredProducts.map(product => (
                <div className="table-row" key={product.id}>
                    <div className="table-cell" onClick={() => handleProductClick(product.id)}>
                        <img src={product.image} alt={product.name} />
                        <div>{product.name}</div>
                        <div>{product.price}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default ProductDisplay;