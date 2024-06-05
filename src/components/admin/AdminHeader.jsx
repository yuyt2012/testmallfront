// src/components/AdminHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/admin/AdminHeader.css';

const AdminHeader = () => {
    return (
        <header className="AdminHeader">
            <nav>
                <ul>
                    <li><Link to="/">메인</Link></li>
                    <li><Link to="/admin/users">회원관리</Link></li>
                    <li><Link to="/admin/products">상품관리</Link></li>
                    <li><Link to="/admin/posts">게시판관리</Link></li>
                </ul>
            </nav>
        </header>
    );
}


export default AdminHeader;