import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getPost} from '../api/BoardAPI.jsx';
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core';


const Post = () => {
    const {id} = useParams(); // Get the post ID from the URL parameters
    const [post, setPost] = useState(null); // State variable for the post data
    const token = localStorage.getItem('token');

    // Fetch the post data from the API
    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPost(id, token); // Call the getPost function with the post ID
            setPost(postData); // Set the post data
        };

        fetchPost();
    }, [id]); // Re-run the effect when the post ID changes

    // Render the post data
    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>글쓴이</TableCell>
                                <TableCell>{post.writer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>내용</TableCell>
                                <TableCell>{post.content}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Post;