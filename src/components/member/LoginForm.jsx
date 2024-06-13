import React, {useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import {handleLogin} from '../api/GeneralLoginAPI.jsx';
import {handleKakaoLogin} from '../api/KakaoLoginAPI.jsx';
import CommonHeader from "../CommonHeader.jsx";
import { Container, Box, TextField, Button } from '@material-ui/core';
import kakaoLoginImage from '/image/kakao_login_medium_narrow.png';

const LoginForm = () => {
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const user = await handleLogin(email, password, navigate);
        if (user) {
            alert('로그인 성공');
            setUser(user);
        } else {
            alert('로그인 실패');
        }
    };

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <Container style={{width: '20%', height: '0%', position: 'relative', top: '200px'}}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" type="email" name="email" fullWidth margin="normal" required />
                        <TextField label="Password" type="password" name="password" fullWidth margin="normal" required />
                        <Button type="submit" variant="contained" color="primary" fullWidth>로그인</Button>
                    </form>
                    <Box mt={0}>
                        <Button style={{position: 'relative', top: '200px'}} onClick={handleKakaoLogin} variant="contained" fullWidth>
                            <img src={kakaoLoginImage} alt="카카오로 로그인"/>
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Link to="/signup">
                            <Button style={{position: 'relative', top: '200px'}} variant="contained" color="secondary" fullWidth>회원가입</Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;