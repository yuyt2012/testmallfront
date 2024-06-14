import axios from "axios";

export async function registerPost(postDTO, token) {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/registerpost",
            data: postDTO,
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

export async function getPostList(size = 10, page = 0, token) {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost:8080/postlist",
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
        console.error(error);
        return [];
    }
}

export async function getPost(postId, token) {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/post/${postId}`,
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