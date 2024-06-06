// src/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext.jsx';
import Main from './components/Main';
import LoginForm from './components/member/LoginForm.jsx';
import SignupForm from './components/member/SignupForm.jsx';
import KakaoLoginSuccess from "./components/member/KakaoLoginSuccess.jsx";
import MyInfo from "./components/member/MyInfo.jsx";
import EditInfo from "./components/member/EditInfo.jsx";
import KakaoSignupForm from "./components/member/KakaoSignupForm.jsx";
import Footer from "./components/Footer.jsx";
import Product from "./components/product/Product.jsx";
import Admin from "./components/admin/Admin.jsx";
import PostManagement from "./components/admin/PostManagement.jsx";
import ProductManagement from "./components/admin/ProductManagement.jsx";
import UserManagement from "./components/admin/UserManagement.jsx";
import ProductRegister from "./components/product/ProductRegister.jsx";
import CategoryAddForm from "./components/product/CategoryRegister.jsx";
import './styles/global.css';
import ProductDetailContainer from "./components/product/ProductDetailContainer.jsx";
import Cart from "./components/cart/Cart.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/signup" element={<SignupForm/>}/>
                    <Route path="/kakaoLoginSuccess" element={<KakaoLoginSuccess/>}/>
                    <Route path="/kakaoSignupForm" element={<KakaoSignupForm/>}/>
                    <Route path="/myinfo" element={<MyInfo/>}/> {/* |MyInfo 컴포넌트를 /myinfo 경로에 연결합니다. */}
                    <Route path="/edit" element={<EditInfo/>}/>
                    <Route path="/products" element={<Product/>}/>
                    <Route path="/product/:id" element={<ProductDetailContainer/>}/>
                    <Route path="/carts/:email" element={<Cart/>}/>
                    <Route index path="/carts" element={<Cart/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/admin/post" element={<PostManagement/>}/>
                    <Route path="/admin/products" element={<ProductManagement/>}/>
                    <Route path="/admin/users" element={<UserManagement/>}/>
                    <Route path="/admin/product-register" element={<ProductRegister/>}/>
                    <Route path="/admin/product-register/category-add" element={<CategoryAddForm/>}/>
                </Routes>
                <Footer/>
            </Router>
        </AuthProvider>
    );
}

export default App;