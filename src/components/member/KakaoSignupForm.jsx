import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {TextField, Button, Container, Box} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";

function KakaoSignupForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const [form, setForm] = useState({
        email: email,
        password: '',
        name: '',
        phone: '',
        city: '',
        street: '',
        zipcode: '',
        socialLogin: '카카오',
    });

    const handleChange = (e) => {
        if (e.target.name !== 'email') { // 이메일 필드의 변경을 무시합니다.
            setForm({...form, [e.target.name]: e.target.value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: 서버에 회원가입 요청을 보내는 코드를 여기에 작성합니다.
        try {
            const response = await axios.post('http://localhost:8080/signup', form);
            if (response.data.success) {
                alert(response.data.message);
                navigate('/login');
            } else {
                console.log('회원 가입 실패');
                if (response.data.error) {
                    alert(response.data.error);
                }
            }
        } catch (error) {
            console.error('회원 가입 중 에러 발생:', error);
        }
    };

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <Container style={{width: '20%', height: '0%', position: 'relative', top: '-90px', overflow: 'hidden'}}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" name="email" value={form.email} readOnly onChange={handleChange}
                                   fullWidth margin="normal"/>
                        <TextField label="Password" type="password" name="password" value={form.password}
                                   onChange={handleChange} fullWidth margin="normal"/>
                        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth
                                   margin="normal"/>
                        <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth
                                   margin="normal"/>
                        <TextField label="주소" name="city" value={form.city} onChange={handleChange} fullWidth
                                   margin="normal"/>
                        <TextField label="상세주소" name="street" value={form.street} onChange={handleChange} fullWidth
                                   margin="normal"/>
                        <TextField label="우편번호" name="zipcode" value={form.zipcode} onChange={handleChange} fullWidth
                                   margin="normal"/>
                        <TextField label="Social Login" name="socialLogin" value={form.socialLogin} readOnly
                                   fullWidth margin="normal"/>
                        <Button type="submit" variant="contained" color="primary" fullWidth>회원가입</Button>
                    </form>
                </Box>
            </Container>
        </>
    );
}

export default KakaoSignupForm;