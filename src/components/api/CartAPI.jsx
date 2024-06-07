import axios from 'axios';

export const addToCart = async (productId, quantity, email, token) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/cart/add',
            headers: {
                'Authorization': `${token}`
            },
            data: {
                productId: productId,
                quantity: quantity,
                email: email
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add to cart', error);
    }
}

export const cartProducts = async (size = 10, page = 0, token, email) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/cart/products/${email}`,
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
        console.error('Failed to fetch cart products', error);
        return [];
    }
}

export const deleteCartProduct = async (productName, userName, token) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `http://localhost:8080/cart/delete/${productName}/${userName}`,
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete cart product', error);
    }
}