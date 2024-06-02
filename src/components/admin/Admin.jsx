// src/components/AdminPage.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHeader from './AdminHeader.jsx';
import UserManagement from './UserManagement.jsx';
import ProductManagement from './ProductManagement.jsx';
import PostManagement from './PostManagement.jsx';

const AdminPage = () => {
    return (
        <div>
            <AdminHeader />
            <Routes>
                <Route path="/users" element={<UserManagement />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/posts" element={<PostManagement />} />
            </Routes>
        </div>
    );
}

export default AdminPage;