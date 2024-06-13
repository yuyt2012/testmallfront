// Product.jsx
import React, {useState, useEffect, useRef, useContext} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getCategories} from "../api/CategoryRegisterAPI.jsx";
import ProductContainer from "./ProductContainer.jsx";
import CommonHeader from "../CommonHeader.jsx";
import '../css/product/Product.css';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        maxWidth: 130,
        padding: 30,
        margin: 10,
        marginTop: 20,
    },
    media: {
        height: 140,
    },
    typography: {
        alignSelf: 'flex-start',
    },
    button: {
        alignSelf: 'flex-start',
    },
});

function Product() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const classes = useStyles();
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

        // Stop event propagation for child category click events
        if (isChildCategory) {
            event.stopPropagation();
        }
    };

    const handleCartClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/carts');
        }
    };

    const handleOrderCheckClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/order/list');
        }
    };

    const handleMyInfoClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/myinfo');
        }
    };

    useEffect(() => {
        console.log('Selected child category:', selectedChildCategory);
    }, [selectedChildCategory]);

    const links = [
        {text: '장바구니', onClick: handleCartClick},
        {text: '주문상품확인', onClick: handleOrderCheckClick},
        {text: '내 정보', onClick: handleMyInfoClick},
        {text: '뒤로가기' }, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <div className="Product">
            <CommonHeader links={links}/>
            <div className="product-list visible">
                {parentCategories.map(category => (
                    // eslint-disable-next-line react/jsx-key
                    <Card className={classes.root}>
                        <CardActionArea onClick={(event) => handleCategoryClick(category, event)}>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
                                    {category.name}
                                </Typography>
                                <div ref={categoryRef}
                                     className={`child-category-list ${childCategories[category.id] ? 'visible' : ''}`}>
                                    {childCategories[category.id]?.map(childCategory => (
                                        <Button key={childCategory.id}
                                                onClick={(event) => handleCategoryClick(childCategory, event, true)}
                                                className={classes.button}>
                                            {childCategory.name}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
            <ProductContainer selectedParentCategory={selectedParentCategory}
                              selectedChildCategory={selectedChildCategory}/>
        </div>
    );
}

export default Product;