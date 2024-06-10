// src/components/product/ProductDetail.jsx
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getProduct} from '../api/ProductGetAPI.jsx';
import {fetchImage} from '../api/ImageAPI.jsx';
import {Button, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import '../css/product/ProductDetail.css';
import {addToCart} from "../api/CartAPI.jsx";
import ProductContext from "../../contexts/ProductContext.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '50%', // Make the media item a square
        backgroundSize: 'auto', // Ensure the image covers the entire CardMedia area
    },
    content: {
        fontSize: '1.3rem', // Increase font size
        marginBottom: theme.spacing(6), // Add margin to the bottom
    },
}));

function ProductDetail() {
    const classes = useStyles();
    const {id} = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;
    const navigate = useNavigate();
    const {setOrderProduct} = useContext(ProductContext); // Add this line


    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(id, token); // Fetch the product
            setProduct(fetchedProduct); // Set the product

            // Fetch the image
            if (fetchedProduct.imageUrl) {
                const filename = fetchedProduct.imageUrl.split('/').pop(); // Extract filename from imageUrl
                let encodedFilename = encodeURIComponent(filename);
                console.log(encodedFilename);
                fetchedProduct.image = await fetchImage(encodedFilename, token); // Set the fetched image to the product
            }

            setProduct(fetchedProduct); // Set the product
        };
        fetchProduct();
    }, [id, token]);

    console.log(product)

    if (!product) {
        return <div>Loading...</div>; // Show a loading message while the product is being fetched
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handlePurchase = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            setOrderProduct({product, quantity}); // Set the product and quantity in the context
            navigate(`/order/product/${product.id}`, {state: {quantity}}); // Pass the quantity to the order page
        }
    };


    const handleAddToCart = async () => {
        if (!user) { // Use 'user' instead of 'isLogin'
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
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
                    <Typography gutterBottom variant="h5" component="h2" className={classes.content}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.content}>
                        가격: {product.price}
                    </Typography>
                    <input type="number" value={quantity} onChange={handleQuantityChange} min="1"
                           className={classes.content}/><br/>
                    <Button variant="contained" color="primary" onClick={handleAddToCart} className={classes.content} style={{marginRight: '10px'}}>
                        장바구니에 담기
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handlePurchase} className={classes.content}>
                        구매
                    </Button>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.content}>
                        총액: {product.price * quantity}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" component="p">
                    상품 설명
                </Typography>
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