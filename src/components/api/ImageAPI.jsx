import axios from "axios";

export const fetchImage = async (filename, token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/images/${filename}`,
            headers: {
                'Authorization': `${token}`
            },
            responseType: 'blob'
        });

        const blobURL = URL.createObjectURL(new Blob([response.data]));
        return blobURL;
    } catch (error) {
        console.error('Failed to fetch image', error);
    }
}