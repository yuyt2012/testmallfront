// ProductDisplay.jsx
import React, {useState, useEffect} from "react";
import {findAll} from "../api/ProductGetAPI.jsx";
import { fetchImage } from "../api/ImageAPI.jsx";
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/product/ProductDisplay.css';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 100, // Increase the height if the image is cut off
        width: 200,
        backgroundSize: 'contain', // Ensure the image fits within the CardMedia area
    },
});

// eslint-disable-next-line react/prop-types
function ProductDisplay({selectedParentCategory, selectedChildCategory}) {
    const classes = useStyles();
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
                <Card className={classes.root} key={product.id} onClick={() => handleProductClick(product.id)}>
                    <CardMedia
                        className={classes.media}
                        image={product.image}
                        title={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                            {product.price}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default ProductDisplay;