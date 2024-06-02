import axios from "axios";

export const updateMemberAPI = async (updateMemberDTO, token) => {
    try {
        const response = await axios({
            method: 'patch',
            url: 'http://localhost:8080/update',
            data: updateMemberDTO,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};