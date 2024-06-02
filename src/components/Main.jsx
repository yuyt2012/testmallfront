// src/components/Main.jsx
import React, {useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './css/Main.css';
import { AuthContext } from '../contexts/AuthContext.jsx';

function Main() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); // 로그아웃 처리
        navigate('/'); // 홈으로 이동합니다.
    };

    return (
        <div className="Main">
            <Header/>
            <div className="login-section">
                {user ? (
                    <>
                        <span>{user.name}님</span>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <Link to="/login">
                        <button>로그인</button>
                    </Link>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default Main;