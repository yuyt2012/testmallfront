import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import '../css/KakaoSignupForm.css';
import axios from "axios";
import Footer from "../Footer.jsx";

function KakaoSignupForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const generatePassword = () => {
        return uuidv4().split('-').join('').substring(0, 10);
    };

    const [form, setForm] = useState({
        email: email,
        password: generatePassword(),
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

    return (
        <div className={'KakaoSignupForm'}>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={form.email} readOnly onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={form.password} readOnly onChange={handleChange}/>
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={form.name} onChange={handleChange} required/>
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}/>
                </label>
                <label>
                    <span>
                        City:
                        <input type="text" name="city" value={form.city} onChange={handleChange}/>
                    </span>
                </label>
                <label>
                    <span>
                        Street:
                        <input type="text" name="street" value={form.street} onChange={handleChange}/>
                    </span>
                </label>
                <label>
                    <span>
                        Zipcode:
                        <input type="text" name="zipcode" value={form.zipcode} onChange={handleChange}/>
                    </span>
                </label>
                <label>
                    Social Login:
                    <input type="text" name="socialLogin" value={form.socialLogin} readOnly onChange={handleChange}/>
                </label>
                <input type="submit" value="회원가입"/>
            </form>
            <Footer/>
        </div>
    );
}

export default KakaoSignupForm;