import axios from "axios";

export const saveProduct = async (productDTO, token) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/product/save',
            data: productDTO,
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