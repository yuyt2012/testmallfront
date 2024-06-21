import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {
    TextField,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, Dialog
} from '@material-ui/core';
import {getPost, updatePost} from '../api/BoardAPI';
import CommonHeader from "../CommonHeader.jsx";

const UpdatePost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPost(id, token);
            setPost(postData);
            setTitle(postData.title);
            setContent(postData.content);
        };

        fetchPost();
    }, [id, token]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleUpdate = async () => {
        if (password) {
            const updatedPost = {
                title,
                content,
                password
            };

            const response = await updatePost(updatedPost, id, token);
            if (response === 'success') {
                alert('게시글이 수정되었습니다.');
                navigate(`/board/post/${id}`);
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } else {
            alert('비밀번호를 입력해주세요.');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    }

    const links = [
        {text: '뒤로가기'}
    ];

    return (
        <>
            <CommonHeader links={links}/>
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
                            <TextField
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid style={{position: 'relative', left: '220px'}} item xs={2}>
                        <Paper style={{padding: '3px'}}>
                            <TextField
                                value={post?.writer}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Paper style={{padding: '16px', width: '1000px', height: '600px', overflow: 'auto'}}>
                    <TextField
                        value={content}
                        onChange={handleContentChange}
                        multiline
                        variant="outlined"
                        fullWidth
                    />
                </Paper>
                <Button variant="contained" color="primary" style={{position: 'relative', left: 820, top: 20}}
                        onClick={handleClickOpen}>수정</Button>
                <Button variant="contained" color="secondary" style={{position: 'relative', left: 900, top: 20}}
                        onClick={handleCancel}>취소</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>비밀번호를 입력하세요</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            게시글을 수정하려면 비밀번호를 입력해주세요.
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
                        <Button onClick={handleUpdate}>수정</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default UpdatePost;