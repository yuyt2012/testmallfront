// Header.jsx
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import {AuthContext} from "../contexts/AuthContext.jsx";

function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header className="Header">
            <nav>
                <ul>
                    {user && user.role === 'ADMIN' && <li><Link to="/admin">관리자페이지</Link></li>}
                    <li><Link to="/products">쇼핑하러가기</Link></li>
                    <li><Link to="/orders">게시판</Link></li>
                    <li><Link to="/myinfo">내 정보</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;