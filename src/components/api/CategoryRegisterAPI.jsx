import axios from 'axios';

export const createCategoryWithSubCategories = async (categoryDTO, token) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/category',
            data: categoryDTO,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getCategories = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8080/categories',
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data || []; // API 요청이 실패하면 빈 배열을 반환합니다.
    } catch (error) {
        console.error(error);
        return []; // API 요청이 실패하면 빈 배열을 반환합니다.
    }
};