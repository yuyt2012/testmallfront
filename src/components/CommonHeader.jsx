import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './css/CommonHeader.css'
import {Button} from "@material-ui/core";
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.jpg';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Grid } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
function CommonHeader({links}) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            setUser(null); // 로그아웃 처리
            navigate('/'); // 홈으로 이동합니다.
        }
    };

    return (
        <header className="Header">
            <nav>
                <Grid container alignItems="center">
                    <Grid item>
                        {user ? (
                            <>
                                <span style={{marginRight: '20px'}} >{user.name}님</span>
                                <Button variant="contained" color="primary" onClick={handleLogout}>
                                    로그아웃
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" color="primary" component={Link} to="/login">
                                로그인
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs>
                        <img src={logo} alt="TestMall Logo" className="logo"
                             onClick={() => navigate('/')}/> {/* 로고 이미지를 추가하고, 클릭하면 홈페이지로 이동하도록 설정합니다. */}
                    </Grid>
                    <Grid item>
                        <ul>
                            {/* eslint-disable-next-line react/prop-types */}
                            {links.map((link, index) => (
                                <Button
                                    key={index}
                                    onClick={link.onClick ? link.onClick : link.text === '뒤로가기' ? handleBackClick : () => navigate(link.path)}
                                >
                                    {link.text}
                                </Button>
                            ))}
                        </ul>
                    </Grid>
                </Grid>
            </nav>
        </header>
    );
}

export default CommonHeader;