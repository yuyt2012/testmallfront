import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {cancelOrder, getOrderDetails} from '../api/OrderAPI.jsx';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    CircularProgress,
    TableContainer,
    Paper,
    Box,
    Button
} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";

// eslint-disable-next-line react/prop-types
function OrderDetails() {
    const {orderId} = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token'); // Get the token from local storage

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const data = await getOrderDetails(orderId, token); // Pass the token to getOrderDetails
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, token]); // Add token to the dependency array

    if (loading) {
        return <CircularProgress/>;
    }

    if (!orders || orders.length === 0) {
        return <div>No orders found</div>;
    }

    const groupedOrders = orders.reduce((grouped, order) => {
        (grouped[order.orderId] = grouped[order.orderId] || []).push(order);
        return grouped;
    }, {});

    const links = [
        {text: '뒤로가기'},
    ];

    const handleCancelClick = async () => {
        try {
            const response = await cancelOrder(orderId, token);
            if (response) {
                alert('주문이 성공적으로 취소되었습니다.');
            } else {
                alert('주문 취소에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('주문 취소에 실패하였습니다. 다시 시도해주세요.');
        }
    }

    return (
        <>
            <CommonHeader links={links}/>
            <h1>주문 상세</h1>
            <h2>주문 번호 : {orderId}</h2>
            {Object.values(groupedOrders).map((group) => {
                const orderInfo = group[0]; // 주문 정보는 모든 항목에서 동일하므로 첫 번째 항목에서 가져옵니다.

                return (
                    <div key={orderInfo.orderId}>
                        <TableContainer style={{marginTop: '10px'}}>
                            {group.map((order) => (
                                // eslint-disable-next-line react/jsx-key
                                <Box style={{padding: '10px'}}> {/* Add bottom margin */}
                                    <TableContainer style={{marginTop: '10px'}} component={Paper}>
                                        <Table key={order.productName}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>상품 이름</TableCell>
                                                    <TableCell>{order.productName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>가격</TableCell>
                                                    <TableCell>{order.price}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>수량</TableCell>
                                                    <TableCell>{order.quantity}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            ))}
                        </TableContainer>
                        <TableContainer
                            style={{marginTop: '10px', width: '60%', marginRight: 'auto', marginLeft: 'auto'}}
                            component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>주문 상태</TableCell>
                                        <TableCell>{orderInfo.orderStatus}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>배송 진행 상황</TableCell>
                                        <TableCell>{orderInfo.deliveryStatus}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>결제 방법</TableCell>
                                        <TableCell>{orderInfo.paymentMethod}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>배송 방법</TableCell>
                                        <TableCell>{orderInfo.shippingMethod}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>받는 사람 이름</TableCell>
                                        <TableCell>{orderInfo.receiverName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>받는 사람 전화</TableCell>
                                        <TableCell>{orderInfo.receiverPhone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>받는 사람 주소</TableCell>
                                        <TableCell>{orderInfo.receiverCity}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>받는 사람 상세주소</TableCell>
                                        <TableCell>{orderInfo.receiverStreet}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>받는 사람 우편번호</TableCell>
                                        <TableCell>{orderInfo.receiverZipcode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>주문 날짜</TableCell>
                                        <TableCell>{orderInfo.orderDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>결제 금액</TableCell>
                                        <TableCell>{orderInfo.totalPrice}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="secondary" onClick={handleCancelClick}>주문 취소</Button>
                            </Box>
                        </TableContainer>
                    </div>
                );
            })}
        </>
    );
}

export default OrderDetails;