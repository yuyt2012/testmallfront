// src/components/EditInfo.jsx
import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import '../css/member/EditInfo.css';
import Footer from "../Footer.jsx";
import {updateMemberAPI} from "../api/UpdateMemberAPI.jsx";
import axios from "axios";
import {TextField, Button, Container, Box, Grid, Typography} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";

function EditInfo() {
    const {user, setUser} = useContext(AuthContext);
    const [form, setForm] = useState({
        ...user, currentPassword: '', password: '',
        role: user.role
    });
    const navigate = useNavigate();

    const getUpdatedFields = (original, updated) => {
        let updateMemberDTO = {
            email: updated.email,
            role: original.role,
        };
        for (let key in original) {
            if (key !== 'email' && key !== 'role' && original[key] !== updated[key]) {
                updateMemberDTO[key] = updated[key];
            }
        }
        return updateMemberDTO;
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: 서버에 수정 요청을 보내고, 응답을 받아서 setUser를 업데이트합니다.
        const token = localStorage.getItem('token');
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8080/passwordCheck',
                data: {
                    email: form.email,
                    password: form.currentPassword
                },
                headers: {'Authorization': `${token}`}
            });

            if (response.data === true) {
                const updateMemberDTO = getUpdatedFields(user, form);
                const updatedInfo = await updateMemberAPI(updateMemberDTO, token);
                if (updatedInfo) {
                    updatedInfo.user.role = user.role;
                    setUser(updatedInfo.user);
                    navigate('/myinfo');
                } else {
                    alert("업데이트 실패");
                }
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error('회원 정보 수정 중 에러 발생:', error);
        }
    };

    return (
        <>
            <CommonHeader links={[{text: '뒤로가기', path: '/myinfo'}]}/>
            <Container style={{width: '15%'}} className="EditInfo">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label="Email" type="email" name="email" value={form.email} fullWidth readOnly/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Password" type="password" name="password" value={form.password} fullWidth
                                       readOnly/>
                            <Link to="/change-password">비밀번호 변경</Link>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Name" type="text" name="name" value={form.name} fullWidth readOnly/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Role" type="text" name="role" value={form.role} fullWidth readOnly/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Phone" type="tel" name="phone" value={form.phone} fullWidth
                                       onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="주소" type="text" name="city" value={form.city} fullWidth
                                       onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="상세주소" type="text" name="street" value={form.street} fullWidth
                                       onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="우편번호" type="text" name="zipcode" value={form.zipcode} fullWidth
                                       onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Social Login" type="text" name="socialLogin" value={form.socialLogin}
                                       fullWidth readOnly={form.socialLogin === '' ? true : false} onChange={form.socialLogin !== '' ? handleChange : null}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Current Password" type="password" name="currentPassword"
                                       value={form.currentPassword} fullWidth onChange={handleChange} required/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className="button-container" display="flex" justifyContent="center">
                                <Button type="submit" variant="contained" color="primary">확인</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Footer/>
                </form>
            </Container>
        </>
    );
}

export default EditInfo;