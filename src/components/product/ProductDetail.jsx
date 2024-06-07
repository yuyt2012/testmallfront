// src/components/product/ProductDetail.jsx
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getProduct} from '../api/ProductGetAPI.jsx';
import {fetchImage} from '../api/ImageAPI.jsx';
import {Card, CardMedia, CardContent, Typography, Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import '../css/product/ProductDetail.css';
import {addToCart} from "../api/CartAPI.jsx";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },

    media: {
        height: 0,
        paddingTop: '50%', // Make the media item a square
        backgroundSize: 'auto', // Ensure the image covers the entire CardMedia area
    },
});


function ProductDetail() {
    const classes = useStyles();
    const {id} = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState(null); // Add this line
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(id, token); // Fetch the product
            setProduct(fetchedProduct); // Set the product

            // Fetch the image
            if (fetchedProduct.imageUrl) {
                const filename = fetchedProduct.imageUrl.split('/').pop(); // Extract filename from imageUrl
                let encodedFilename = encodeURIComponent(filename);
                const fetchedImage = await fetchImage(encodedFilename, token);
                fetchedProduct.image = fetchedImage; // Set the fetched image to the product
            }

            setProduct(fetchedProduct); // Set the product
        };
        fetchProduct();
    }, [id, token]);

    if (!product) {
        return <div>Loading...</div>; // Show a loading message while the product is being fetched
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handlePurchase = () => {
        // Implement purchase functionality here
    };

    const handleAddToCart = async () => {
        const userConfirmed = window.confirm('장바구니에 등록 하시겠습니까?');
        if (userConfirmed) {
            try {
                await addToCart(product.id, quantity, email, token);
                alert('장바구니에 상품이 추가되었습니다.');
                setQuantity(1); // Reset quantity to 1 after successful add to cart
            } catch (error) {
                alert('장바구니 추가에 실패했습니다.');
            }
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                />
            </Grid>
            <Grid item xs={6}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: {product.price}
                    </Typography>
                    <input type="number" value={quantity} onChange={handleQuantityChange} min="1"/><br/>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handlePurchase}>
                        Purchase
                    </Button>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Total: {product.price * quantity}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description} {/* Assuming product.description contains the product description */}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ProductDetail;