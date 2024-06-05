// src/components/MyInfo.jsx
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import '../css/member/MyInfo.css';
import Footer from "../Footer.jsx";

function MyInfo() {
    const {user} = useContext(AuthContext);

    return (
        <div className="MyInfo">
            <form>
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} readOnly/>
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={user.name} readOnly/>
                </label>
                <label>
                    Role:
                    <input type="text" name="role" value={user.role} readOnly/>
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={user.phone} readOnly/>
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={user.city} readOnly/>
                </label>
                <label>
                    Street:
                    <input type="text" name="street" value={user.street} readOnly/>
                </label>
                <label>
                    Zipcode:
                    <input type="text" name="zipcode" value={user.zipcode} readOnly/>
                </label>
                <label>
                    Social Login:
                    <input type="text" name="socialLogin" value={user.socialLogin} readOnly/>
                </label>
                <div className="button-container">
                    <Link to="/edit">
                        <button type="button">수정</button>
                    </Link>
                    <Link to="/">
                        <button type="button">돌아가기</button>
                    </Link>
                </div>
                <Footer/>
            </form>
        </div>
    );
}

export default MyInfo;