// src/components/AdminPage.jsx
import React from 'react';
import CommonHeader from "../CommonHeader.jsx";

const AdminPage = () => {

    const links = [
        {text: '회원관리', path: '/admin/users'},
        {text: '상품관리', path: '/admin/products'},
        {text: '게시판관리', path: '/admin/post'},
        {text: '뒤로가기' }, // 실제 경로로 교체해야 합니다.

    ];
    return (
        <div>
            <CommonHeader links={links}/>
        </div>
    );
}

export default AdminPage;