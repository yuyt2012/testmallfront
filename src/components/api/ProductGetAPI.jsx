// src/components/api/ProductGetAPI.jsx
import axios from 'axios';

export const getProductList = async (size = 10, page = 0, token) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8080/productlist',
            params: {
                size,
                page,
            },
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const findAll = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8080/product/findall',
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProduct = async (id,token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/product/${id}`,
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data || {};
    } catch (error) {
        console.error(error);
        return {};
    }
};