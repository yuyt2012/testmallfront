// src/components/order/Order.jsx
import React, {useContext, useState, useEffect} from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import {
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    TableFooter,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox} from '@material-ui/core';
import ProductContext from "../../contexts/ProductContext.jsx";
import {getProduct} from "../api/ProductGetAPI.jsx";
import {fetchImage} from '../api/ImageAPI.jsx';
import CommonHeader from "../CommonHeader.jsx";

function Order() {
    const {id} = useParams();
    const location = useLocation();
    const {
        orderProduct,
        orderProducts: contextProducts = [],
        orderQuantities: contextQuantities = []
    } = useContext(ProductContext); // Get multiple products and their quantities from the context
    const [products, setProducts] = useState(contextProducts);
    const [quantities, setQuantities] = useState(contextQuantities);
    const token = localStorage.getItem('token');
    const totalAmount = products.reduce((total, product, index) => total + product.price * quantities[index], 0);
    const navigate = useNavigate();
    const [isSameInfo, setIsSameInfo] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };


    const [ordererInfo, setOrdererInfo] = useState({
        name: '',
        phone: '',
        address: '',
        detailAddress: '',
        postalCode: ''
    });

    const [receiverInfo, setReceiverInfo] = useState({
        name: '',
        phone: '',
        address: '',
        detailAddress: '',
        postalCode: ''
    });

    const handleOrdererInfoChange = (event) => {
        setOrdererInfo({
            ...ordererInfo,
            [event.target.name]: event.target.value
        });
        if (isSameInfo) {
            setReceiverInfo({
                ...receiverInfo,
                [event.target.name]: event.target.value
            });
        }
    };

    const handleReceiverInfoChange = (event) => {
        setReceiverInfo({
            ...receiverInfo,
            [event.target.name]: event.target.value
        });
    };

    const handleIsSameInfoChange = (event) => {
        setIsSameInfo(event.target.checked);
        if (event.target.checked) {
            setReceiverInfo(ordererInfo);
        }
    };

    const handleCancelClick = () => {
        const confirmCancel = window.confirm('주문을 취소하시겠습니까?');
        if (confirmCancel) {
            window.alert('취소되었습니다.');
            navigate(-1);
        }
    };

    const handleOrderClick = () => {
        if (!ordererInfo.name || !ordererInfo.phone || !ordererInfo.address || !ordererInfo.detailAddress || !receiverInfo.name || !receiverInfo.phone || !receiverInfo.address || !receiverInfo.detailAddress) {
            window.alert('모든 필드를 채워주세요.');
            return;
        }

        if (!paymentMethod) {
            window.alert('결제 방식을 선택해주세요.');
            return;
        }

        const confirmOrder = window.confirm(`총 ${totalAmount}을 결제하시겠습니까?`);
        if (confirmOrder) {
            // 주문을 진행하는 코드를 여기에 작성합니다.
        }
    };


    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const fetchedProduct = await getProduct(id, token);

                // Fetch the image
                if (fetchedProduct.imageUrl) {
                    const filename = fetchedProduct.imageUrl.split('/').pop(); // Extract filename from imageUrl
                    let encodedFilename = encodeURIComponent(filename);
                    fetchedProduct.image = await fetchImage(encodedFilename, token); // Set the fetched image to the product
                }

                setProducts([fetchedProduct]); // Set a single product
                setQuantities([location.state.quantity]); // Set a single quantity
            } else if (contextProducts.length > 0 && (contextProducts !== products || contextQuantities !== quantities)) {
                // 장바구니에서 넘어온 경우, ProductContext에서 여러 상품의 정보와 그들의 구매 개수를 가져옵니다.
                // contextProducts나 contextQuantities가 변경될 때만 setProducts와 setQuantities를 호출합니다.
                setProducts(contextProducts);
                setQuantities(contextQuantities);
            }
        };

        fetchProduct();
    }, [id, token, contextProducts, contextQuantities]);

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    function getProductName(product) {
        return product.productName != null ? product.productName : product.name;
    }

    if (products.length > 0) {
        return (
            <div>
                <CommonHeader links={links}/>

                <h2>상품 정보</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">상품 이미지</TableCell>
                                <TableCell align="center">상품 이름</TableCell>
                                <TableCell align="center">구매 수량</TableCell>
                                <TableCell align="center">총 가격</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell align="center">
                                        <img src={product.image} alt={product.name} style={{width: '50px'}}/>
                                    </TableCell>
                                    <TableCell align="center">{product && getProductName(product)}</TableCell>
                                    <TableCell align="center">{quantities[index]}</TableCell>
                                    <TableCell align="center">{product.price * quantities[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4} align="right">
                                    <Typography variant="h6">결제 예정 금액:</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6">{totalAmount}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={5}>
                        <h2>주문자 정보</h2>
                        <Paper style={{position: 'relative', padding: '20px', marginBottom: '20px', top: '40px'}}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField label="이름" name="name" variant="outlined" style={{width: '100%'}}
                                               value={ordererInfo.name} onChange={handleOrdererInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="전화번호" name="phone" variant="outlined" style={{width: '100%'}}
                                               value={ordererInfo.phone} onChange={handleOrdererInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="주소" name="address" variant="outlined" style={{width: '100%'}}
                                               value={ordererInfo.address} onChange={handleOrdererInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="상세주소" name="detailAddress" variant="outlined"
                                               style={{width: '100%'}} value={ordererInfo.detailAddress}
                                               onChange={handleOrdererInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="우편번호" name="postalCode" variant="outlined" style={{width: '100%'}}
                                               value={ordererInfo.postalCode} onChange={handleOrdererInfoChange}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <h2>받는사람 정보</h2>
                        <FormControlLabel
                            control={<Checkbox checked={isSameInfo} onChange={handleIsSameInfoChange}/>}
                            label="주문자와 동일"
                        />
                        <Paper style={{padding: '20px', marginBottom: '20px'}}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField label="이름" name="name" variant="outlined" style={{width: '100%'}}
                                               value={receiverInfo.name} onChange={handleReceiverInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="전화번호" name="phone" variant="outlined" style={{width: '100%'}}
                                               value={receiverInfo.phone} onChange={handleReceiverInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="주소" name="address" variant="outlined" style={{width: '100%'}}
                                               value={receiverInfo.address} onChange={handleReceiverInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="상세주소" name="detailAddress" variant="outlined"
                                               style={{width: '100%'}} value={receiverInfo.detailAddress}
                                               onChange={handleReceiverInfoChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="우편번호" name="postalCode" variant="outlined" style={{width: '100%'}}
                                               value={receiverInfo.postalCode} onChange={handleReceiverInfoChange}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                </Grid>

                <h2>결제 방법</h2>
                <RadioGroup row onChange={handlePaymentMethodChange}>
                    <FormControlLabel value="card" control={<Radio/>} label="카드"/>
                    <FormControlLabel value="bank" control={<Radio/>} label="무통장 입금"/>
                    <FormControlLabel value="kakao" control={<Radio/>} label="카카오페이"/>
                </RadioGroup>

                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleOrderClick}>주문하기</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={handleCancelClick}>취소</Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default Order;