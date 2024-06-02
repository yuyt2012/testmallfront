// src/api/memberAPI.js
import axios from 'axios';

export const fetchMembers = async (size = 10, page = 0, token) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8080/memberlist',
            params: {
                size,
                page,
            },
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data.content;
    } catch (error) {
        console.error('Failed to fetch member list', error);
    }
};