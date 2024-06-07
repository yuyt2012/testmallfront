// CommonHeader.jsx
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './css/CommonHeader.css'
import {Button} from "@material-ui/core";
import logo from '../assets/logo.png';

// eslint-disable-next-line react/prop-types
function CommonHeader({links}) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <header className="Header">
            <nav>
                <img src={logo} alt="TestMall Logo" className="logo"
                     onClick={() => navigate('/')}/> {/* 로고 이미지를 추가하고, 클릭하면 홈페이지로 이동하도록 설정합니다. */}
                <ul>
                    {/* eslint-disable-next-line react/prop-types */}
                    {links.map((link, index) => (
                        <Button
                            key={index}
                            onClick={link.text === '뒤로가기' ? handleBackClick : () => navigate(link.path)}
                        >
                            {link.text}
                        </Button>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default CommonHeader;