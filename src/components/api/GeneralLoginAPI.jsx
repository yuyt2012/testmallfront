// src/components/api/GeneralLoginAPI.jsx
import axios from 'axios';

export const handleLogin = async (email, password, navigate) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: { email, password },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const token = response.headers['authorization'];
        if (token) {
            localStorage.setItem('token', token);
        }

        if (response.data.success) {
            const user = {
                ...response.data.user,
                role: response.data.role,
                address: {
                    city: response.data.city,
                    street: response.data.street,
                    zipcode: response.data.zipcode
                }
            };

            if (user.role === 'ADMIN') {
                navigate('/admin'); // Redirect to admin page
            } else {
                navigate('/'); // Redirect to user page
            }

            return user;
        } else {
            throw new Error(response.data.message ? response.data.message : 'Unknown error');
        }
    } catch (error) {
        console.error('로그인 중 에러 발생:', error);
        return null;
    }
};