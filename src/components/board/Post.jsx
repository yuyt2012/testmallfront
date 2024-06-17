import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getPost} from '../api/BoardAPI.jsx';
import {
    Table,
    TableBody,
    TableRow,
    Paper,
    Typography,
    Container,
    Grid,
    TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";
import {deletePost} from "../api/BoardAPI.jsx";


const Post = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleDelete = async () => {
        if (password) {
            const response = await deletePost(post.id, password, token);

            if (response === 'success') {
                alert('게시글이 삭제되었습니다.');
                window.location.href = '/board';
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        }
    };


    const handleUpdate = () => {

    }


    const links = [
        {text: '뒤로가기'},
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <div>
                {post ? (
                    <>
                        <Container style={{
                            paddingTop: '20px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            minHeight: '120vh',
                            minWidth: '123vh'
                        }}>
                            <Grid container spacing={3}>
                                <Grid style={{paddingBlock: '20px'}} item xs={6}>
                                    <Paper style={{padding: '3px'}}>
                                        <Typography align={"left"} variant="h5" component="h2" gutterBottom>
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
                                <TextField style={{paddingBlock: '20px'}}
                                           label="New Comment"
                                           value={newComment}
                                           onChange={handleCommentChange}
                                />
                                <Button style={{paddingBlock: '30px'}} onClick={handleCommentSubmit}>Submit</Button>
                            </div>
                            <div>
                                {comments.map((comment, index) => (
                                    <p key={index}>{comment}</p>
                                ))}
                            </div>
                            <Button variant="contained" color="primary"
                                    style={{position: 'relative', left: 820, bottom: 80}}
                                    onClick={handleUpdate}>수정</Button>
                            <Button variant="contained" color="secondary"
                                    style={{position: 'relative', left: 890, bottom: 80}}
                                    onClick={handleClickOpen}>삭제</Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>비밀번호를 입력하세요</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        게시글을 삭제하려면 비밀번호를 입력해주세요.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="password"
                                        label="비밀번호"
                                        type="password"
                                        fullWidth
                                        onChange={handlePasswordChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>취소</Button>
                                    <Button onClick={handleDelete}>삭제</Button>
                                </DialogActions>
                            </Dialog>
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