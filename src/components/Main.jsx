// src/components/Main.jsx
import React, {useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import CommonHeader from "./CommonHeader.jsx";
import { AuthContext } from '../contexts/AuthContext.jsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loginSection: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
    loginButton: {
        fontSize: 'large',
    },
    linkContainer: {
        marginTop: theme.spacing(1),
    },
}));

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

    const handleOrderCheckClick = () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/order/list');
        }
    };

    const handleLogout = () => {
        setUser(null); // 로그아웃 처리
        navigate('/'); // 홈으로 이동합니다.
    };

    const links = [
        {text: '쇼핑하러가기', path: '/products'},
        {text: '주문상품확인', onClick: handleOrderCheckClick},
        {text: '게시판', path: '/board'},
        {text: '내 정보', onClick: handleMyInfoClick},
    ];


    if (user && user.role === 'ADMIN') {
        links.push({text: '관리자 페이지', path: '/admin'});
    }


    return (
        <div className="Main">
            <CommonHeader links={links}/>
            <Footer/>
        </div>
    );
}

export default Main;