import React, {useState, useEffect} from 'react';
import {cartProducts} from '../api/CartAPI.jsx';
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar, Button
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {fetchImage} from "../api/ImageAPI.jsx";
import {useParams, useNavigate} from "react-router-dom";
import CommonHeader from '../CommonHeader.jsx';
import {deleteCartProduct} from "../api/CartAPI.jsx";

const useStyles = makeStyles({
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        height: "auto", // Set the height
        width: 100, // Set the width
        margin: '0 auto', // Center the image
        border: '1px solid black',
        borderRadius: 0,
    },
    tableContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    button: {
        width: '100px',
    }
});

function Cart() {
    const classes = useStyles();
    let {email} = useParams();
    const [cartProduct, setCartProduct] = useState([]);
    const token = localStorage.getItem('token');
    const [checkedProducts, setCheckedProducts] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    // If no email in URL, try to get it from localStorage

    if (!email) {
        email = user && user.email ? user.email : null;
    }

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (email) {
                const products = await cartProducts(10, 0, token, email);
                // Check if products is an array before setting the state
                if (Array.isArray(products.content)) {
                    // Fetch images for each product
                    for (let product of products.content) {
                        const filename = product.imageUrl.split('/').pop();
                        product.image = await fetchImage(filename, token);
                    }
                    setCartProduct(products.content);
                } else {
                    console.error('Unexpected response from cartProducts API:', products);
                    setCartProduct([]); // Set to an empty array as a fallback
                }
            } else {
                console.error('No email found');
            }
        };
        fetchCartProducts();
    }, [email, token]);

    const handleHeaderCheckboxClick = (event) => {
        if (event.target.checked) {
            // 모든 아이템 선택
            setCheckedProducts(cartProduct.map(item => item.productName));
        } else {
            // 모든 아이템 선택 해제
            setCheckedProducts([]);
        }
    };

    // 아이템의 체크박스 클릭 핸들러
    const handleItemCheckboxClick = (event, productName) => {
        if (event.target.checked) {
            // 아이템 선택
            setCheckedProducts(prev => [...prev, productName]);
        } else {
            // 아이템 선택 해제
            setCheckedProducts(prev => prev.filter(name => name !== productName));
        }
    };

    const handleOrderClick = () => {
        // 체크된 항목을 주문 처리합니다.
        // 이 부분은 실제 주문 처리 로직으로 교체해야 합니다.
        console.log('Ordering items:', checkedProducts);
    };

    const handleDeleteClick = async () => {
        // 체크된 항목을 장바구니에서 삭제합니다.
        // 이 부분은 실제 삭제 처리 로직으로 교체해야 합니다.
        for (const productName of checkedProducts) {
            const product = cartProduct.find(product => product.productName === productName);
            if (product) {
                try {
                    await deleteCartProduct(productName, user.name, token);
                    console.log('Deleted:', productName);
                    console.log('user.id:', user.name);
                } catch (error) {
                    console.error('Failed to delete:', productName, error);
                }
            }
            console.log('Deleting items:', checkedProducts);
        }

        const updatedCartProducts = await cartProducts(10, 0, token, email);
        setCartProduct(updatedCartProducts.content || []);

    };

    const links = [
        {text: '주문상품확인', path: '/orders'},
        {text: '내 정보', path: '/myinfo'},
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    const totalOrderAmount = cartProduct.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <CommonHeader links={links}/>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.header}>
                                <Checkbox
                                    checked={cartProduct.length > 0 && checkedProducts.length === cartProduct.length}
                                    indeterminate={checkedProducts.length > 0 && checkedProducts.length < cartProduct.length}
                                    onChange={handleHeaderCheckboxClick}
                                />
                            </TableCell>
                            <TableCell className={classes.header}>제품 이미지</TableCell>
                            <TableCell className={classes.header}>제품명</TableCell>
                            <TableCell className={classes.header}>개수</TableCell>
                            <TableCell className={classes.header}>가격</TableCell>
                            <TableCell className={classes.header}>주문 금액</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartProduct.map((product) => (
                            <TableRow key={product.productName}>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={checkedProducts.includes(product.productName)}
                                        onChange={(event) => handleItemCheckboxClick(event, product.productName)}
                                    />
                                </TableCell>
                                <TableCell align="center"><Avatar src={product.image}
                                                                  className={classes.avatar}/></TableCell>
                                <TableCell align="center">{product.productName}</TableCell>
                                <TableCell align="center">{product.quantity}</TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="center">{product.price * product.quantity}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={5} align="right">총 주문 금액 :</TableCell>
                            <TableCell align="center">{totalOrderAmount}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.buttonContainer}>
                <Button className={classes.button} onClick={handleOrderClick}>주문하기</Button>
                <Button className={classes.button} onClick={handleDeleteClick}>삭제하기</Button>
            </div>
        </div>
    );
}

export default Cart;