// src/components/LoginForm.jsx
import React, {useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import kakaoLoginImage from '/image/kakao_login_medium_narrow.png';
import Footer from '../Footer.jsx';
import '../css/member/LoginForm.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { handleLogin } from '../api/GeneralLoginAPI.jsx';
import { handleKakaoLogin } from '../api/KakaoLoginAPI.jsx';

const LoginForm = () => {
    const { setUser } = useContext(AuthContext);
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

    return (
        <div className="login-form-container">
            <div className="login-section">
                <form onSubmit={handleSubmit}>
                    <div className="email-password-container">
                        <label>
                            Email:
                            <input type="email" name="email"/>
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password"/>
                        </label>
                    </div>
                    <input type="submit" value="로그인"/>
                </form>
                <div className="button-container">
                    <button onClick={handleKakaoLogin}>
                        <img src={kakaoLoginImage} alt="카카오로 로그인"/>
                    </button>
                    <Link to="/signup">
                        <button>회원가입</button>
                    </Link>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default LoginForm;