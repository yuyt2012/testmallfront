import React, {useState} from 'react';
import {TextField, Button, Paper, Container, Box} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";
import TitleInput from "./postcomponents/TitleInput.jsx";
import ContentInput from "./postcomponents/ContentInput.jsx";
import PasswordInput from "./postcomponents/PasswordInput.jsx";
import {useNavigate} from "react-router-dom";
import {registerPost} from "../api/BoardAPI.jsx";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postDTO = {
            email: user.email,
            writer: user.name,
            title: title,
            content: content,
            password: password
        };

        // Call the registerPost function
        const response = await registerPost(postDTO, token);

        if (response === "success") { // Check if the post was successfully created
            alert('게시글이 성공적으로 작성되었습니다.'); // Show a success message
            navigate('/board'); // Navigate to the board page
        } else {
            console.error(response);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        window.confirm("게시글 작성을 취소하시겠습니까?") && navigate(-1);
    }

    const links = [
        {text: '뒤로가기'},
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <Container style={{position: 'relative', top: '65px', minHeight: '100vh'}}>
                <Paper style={{
                    position: 'relative',
                    top: '10px',
                    marginBottom: '10px',
                    width: 'fit-content',
                    maxWidth: 'fit-content'
                }} elevation={3}>
                    <TitleInput title={title} setTitle={setTitle}/>
                </Paper>
                <Paper style={{position: 'relative', top: '10px', marginBottom: '10px', height: '500px'}} elevation={3}>
                    <ContentInput content={content} setContent={setContent}/>
                </Paper>
                <Paper style={{
                    position: 'relative',
                    top: '10px',
                    marginBottom: '10px',
                    width: 'fit-content',
                    maxWidth: 'fit-content'
                }} elevation={3}>
                    <PasswordInput password={password} setPassword={setPassword}/>
                </Paper>
                <Button style={{position: 'relative', top: '10px'}} type="submit" variant="contained" color="primary"
                        onClick={handleSubmit}>
                    글 등록
                </Button>
                <Button style={{position: 'relative', top: '10px', left: '10px'}} type="submit" variant="contained"
                        color="secondary" onClick={handleCancel}>
                    취 소
                </Button>
            </Container>

        </>
    );
};

export default PostForm;
