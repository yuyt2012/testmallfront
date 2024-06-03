import axios from "axios";

export const saveProduct = async (formData, token) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/product/save',
            data: formData,
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};