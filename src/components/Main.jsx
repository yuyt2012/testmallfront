// src/components/Main.jsx
import React, {useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import CommonHeader from "./CommonHeader.jsx";
import './css/Main.css';
import { AuthContext } from '../contexts/AuthContext.jsx';

function Main() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleMyInfoClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/myinfo');
        }
    };

    const handleLogout = () => {
        setUser(null); // 로그아웃 처리
        navigate('/'); // 홈으로 이동합니다.
    };

    const links = [
        {text: '쇼핑하러가기', path: '/products'},
        {text: '주문상품확인', path: '/orders'},
        {text: '내 정보', onClick: handleMyInfoClick}
    ];

    if (user && user.role === 'ADMIN') {
        links.push({text: '관리자 페이지', path: '/admin'});
    }


    return (
        <div className="Main">
            {/* eslint-disable-next-line no-undef */}
            <CommonHeader links={links}/>
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