import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Footer from '../Footer.jsx';
import {Container, TextField, Button, Box} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";

function SignupForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        city: '',
        street: '',
        zipcode: '',
    });

    const [isEmailReadOnly, setEmailReadOnly] = useState(false);
    const [isPasswordReadOnly, setPasswordReadOnly] = useState(false);

    const generatePassword = () => {
        const uuid = uuidv4();
        return uuid.slice(0, 8);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');
        if (emailParam) {
            setForm(prevForm => ({...prevForm, email: emailParam}));
            setEmailReadOnly(true);
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <Container style={{width: '20%', height: '0%', position: 'relative', top: '-100px'}}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Email" type="email" name="email" value={form.email} onChange={handleChange}
                               required
                               readOnly={isEmailReadOnly}/>
                    <TextField label="Password" type="password" name="password" value={form.password}
                               onChange={handleChange} required
                               readOnly={isPasswordReadOnly}/>
                    <TextField label="Name" type="text" name="name" value={form.name} onChange={handleChange} required/>
                    <TextField label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange}/>
                    <TextField label="주소" type="text" name="city" value={form.city} onChange={handleChange}/>
                    <TextField label="상세주소" type="text" name="street" value={form.street} onChange={handleChange}/>
                    <TextField label="우편번호" type="text" name="zipcode" value={form.zipcode} onChange={handleChange}/>
                    <Box mt={2}>
                        <Button style={{position: 'relative', top: '30px'}} type="submit" variant="contained" color="primary">회원가입</Button>
                    </Box>
                </form>
                <Footer/>
            </Container>
        </>
    );
}

export default SignupForm;