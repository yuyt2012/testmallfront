import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getPost} from '../api/BoardAPI.jsx';
import {
    Table, TableBody, TableRow, Paper,
    Typography, Container, Grid, TextField,
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle
} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";
import {deletePost} from "../api/BoardAPI.jsx";
import {registerComment} from "../api/BoardAPI.jsx";
import {getCommentList} from "../api/BoardAPI.jsx";

const Post = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState({content: []});
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const size = 10;
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPost(id, token);
            setPost(postData);
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            const commnetList = await getCommentList(size, page, id, token);
            setComments(commnetList);
        };
        fetchComments();
    }, [id]);

    console.log('comments:', comments);

    const handleCommentChange = (event) => {
        setCommentContent(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (commentContent) {
            const commentDTO = {
                email: user.email,
                postId: post.id,
                writer: user.name,
                content: commentContent
            };

            const response = await registerComment(commentDTO, token);

            console.log('response:', response);

            if (response !== 'success') {
                alert('댓글 등록에 실패했습니다.');
            } else {
                // 댓글 등록이 성공하면 댓글 목록을 새로 가져옵니다.
                fetchComments();
            }
        }
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

    const fetchComments = async (page = 0) => {
        const commentList = await getCommentList(10, page, post.id, token);
        setComments(commentList);
    };


    const handleUpdate = () => {

    }


    const links = [
        {text: '뒤로가기', to: '/board'}
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
                            <Button variant="contained" color="primary"
                                    style={{position: 'relative', left: 820, top: 20}}
                                    component={Link} to={`/updatepost/${post.id}`}
                            >
                                수정
                            </Button>
                            <Button variant="contained" color="secondary"
                                    style={{position: 'relative', left: 890, top: 20}}
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
                            <div>
                                <TextField style={{paddingBlock: '20px'}}
                                           label="New Comment"
                                           value={commentContent}
                                           onChange={handleCommentChange}
                                />
                                <Button style={{paddingBlock: '30px'}} onClick={handleCommentSubmit}>Submit</Button>
                            </div>
                            <div>
                                {comments.content.map((comment, index) => (
                                    <div key={index}>
                                        <p>{comment.writer}</p>
                                        <div style={{display: 'flex', position: 'relative' ,bottom: '25px'}}>
                                            <p>{comment.content}</p>
                                            <h6 style={{position: 'relative', left: '20px'}}>{comment.regDate}</h6>
                                        </div>
                                    </div>
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