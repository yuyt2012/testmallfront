import React, { useState, useEffect } from 'react';
import { cartProducts } from '../api/CartAPI.jsx';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import {useParams} from "react-router-dom";

function Cart() {
    let {email} = useParams();
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');

    // If no email in URL, try to get it from localStorage
    if (!email) {
        const user = JSON.parse(localStorage.getItem('user'));
        email = user ? user.email : null;
    }

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (email) {
                const items = await cartProducts(10, 0, token, email);
                setCartItems(items);
            } else {
                console.error('No email found');
            }
        };
        fetchCartProducts();
    }, [email, token]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>사진</TableCell>
                        <TableCell>제품명</TableCell>
                        <TableCell>개수</TableCell>
                        <TableCell>가격</TableCell>
                        <TableCell>총합 가격</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell><img src={item.image} alt={item.name} style={{width: '50px'}}/></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.price * item.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Cart;