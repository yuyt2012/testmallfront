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