import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";
import {getOrderList} from "../api/OrderAPI.jsx";
import {Link, useParams} from "react-router-dom";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    let {email} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!email) {
        email = user && user.email ? user.email : null;
    }

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrderList(10, 0, token, email);
            if (data && Array.isArray(data.content)) {
                setOrders(data.content);
            } else {
                console.error('getOrderList did not return an array in content');
                setOrders([]); // Ensure orders is always an array
            }
        };
        fetchOrders();
    }, [token, email]);

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    // 주문 목록을 주문 번호로 그룹화합니다.
    const groupedOrders = orders.reduce((grouped, order) => {
        (grouped[order.orderId] = grouped[order.orderId] || []).push(order);
        return grouped;
    }, {});

    return (
        <>
            <CommonHeader links={links}/>
            <h1 style={{textAlign: 'center'}}>주문 목록</h1>
            <TableContainer style={{position: 'relative', top: '10px'}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>주문번호</TableCell>
                            <TableCell align={"center"}>주문상품</TableCell>
                            <TableCell align={"center"}>주문상태</TableCell>
                            <TableCell align={"center"}>배송상태</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {Object.values(groupedOrders).map((group) => {
                            const order = group[0];
                            const additionalItemsCount = group.length - 1;

                            return (
                                <TableRow key={order.orderId}>
                                    <TableCell align={"center"}>
                                        <Link to={`/order/details/${order.orderId}`}>{order.orderId}</Link>
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        {order.productName}
                                        {additionalItemsCount > 0 && ` 외 ${additionalItemsCount}개`}
                                    </TableCell>
                                    <TableCell align={"center"}>{order.orderStatus}</TableCell>
                                    <TableCell align={"center"}>{order.deliveryStatus}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default OrderList;