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

export async function deletePost(postId, password, token) {
    try {
        const response = await axios({
            method: 'delete',
            url: `http://localhost:8080/deletepost/${postId}`,
            data: password,
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updatePost(UpdatePostDTO, postId, token) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://localhost:8080/updatepost/${postId}`,
            data: UpdatePostDTO,
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function registerComment(commentDTO, token) {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/registercomment",
            data: commentDTO,
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

export async function getCommentList(size = 10, page = 0, postId, token) {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/commentlist/${postId}`,
            headers: {
                'Authorization': `${token}`
            },
            params: {
                size,
                page
            }
        });
        if (response.data && Array.isArray(response.data.content)) {
            return response.data;
        } else {
            console.error('getCommentList: response.data.content is not an array');
            return {content: []};
        }
    } catch (error) {
        console.error(error);
        return {content: []};
    }
}