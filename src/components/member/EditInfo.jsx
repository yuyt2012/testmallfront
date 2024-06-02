// src/components/EditInfo.jsx
import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import '../css/EditInfo.css';
import Footer from "../Footer.jsx";
import {updateMemberAPI} from "../api/UpdateMemberAPI.jsx";
import axios from "axios";

function EditInfo() {
    const {user, setUser} = useContext(AuthContext);
    const [form, setForm] = useState({...user, currentPassword: '', password: '',
    role: user.role});
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
        <div className="EditInfo">
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={form.email} readOnly/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={form.password} readOnly/>
                    <Link to="/change-password">비밀번호 변경</Link>
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={form.name} readOnly/>
                </label>
                <label>
                    Role:
                    <input type="text" name="role" value={form.role} readOnly/>
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}/>
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={form.city} onChange={handleChange}/>
                </label>
                <label>
                    Street:
                    <input type="text" name="street" value={form.street} onChange={handleChange}/>
                </label>
                <label>
                    Zipcode:
                    <input type="text" name="zipcode" value={form.zipcode} onChange={handleChange}/>
                </label>
                <label>
                    Social Login:
                    <input type="text" name="socialLogin" value={form.socialLogin} readOnly
                           onChange={handleChange}/>
                </label>
                <label>
                    Current Password:
                    <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange}
                           required/>
                </label>
                <div className="button-container">
                    <button type="submit">확인</button>
                    <Link to="/myinfo">
                        <button type="button">돌아가기</button>
                    </Link>
                </div>
                <Footer/>
            </form>
        </div>
    );
}

export default EditInfo;