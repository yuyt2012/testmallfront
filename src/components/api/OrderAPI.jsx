// src/api/OrderAPI.jsx
import axios from 'axios';

export async function saveOrder(orderDTO, token) {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/order",
            data: orderDTO,
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getOrderList(size = 10, page = 0, token, email) {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/getorders/${email}`,
            headers: {
                'Authorization': `${token}`
            },
            params: {
                size,
                page
            }
        });
        return response.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function cancelOrder(orderId, token) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://localhost:8080/cancelorder/${orderId}`,
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getOrderDetails(orderId, token) {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/getorderdetail/${orderId}`,
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}