import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getPost} from '../api/BoardAPI.jsx';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Typography,
    Container,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";


const Post = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPost(id, token);
            setPost(postData);
        };

        fetchPost();
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        setComments([...comments, newComment]);
        setNewComment('');
    };


    const links = [
        {text: '뒤로가기'},
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <div>
                {post ? (
                    <>
                        <Container style={{paddingTop: '20px', marginLeft: 'auto', marginRight: 'auto'}}>
                            <Grid container spacing={3}>
                                <Grid style={{paddingBlock: '20px'}} item xs={6}>
                                    <Paper style={{padding: '3px'}}>
                                        <Typography align={"center"} variant="h5" component="h2" gutterBottom>
                                            {post.title}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid style={{position: 'relative', paddingBlock: '20px', left: '220px'}} item xs={2}>
                                    <Paper style={{padding: '3px'}}>
                                        <Typography align={"center"} variant="h6" component="h2" gutterBottom>
                                            {post.writer}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Paper style={{padding: '16px', width: '1000px', height: '600px', overflow: 'auto'}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <div dangerouslySetInnerHTML={{__html: post.content}}/>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <div>
                                <TextField
                                    label="New Comment"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                                <Button onClick={handleCommentSubmit}>Submit</Button>
                            </div>
                            <div>
                                {comments.map((comment, index) => (
                                    <p key={index}>{comment}</p>
                                ))}
                            </div>
                        </Container>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default Post;