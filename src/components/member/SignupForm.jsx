// src/components/SignupForm.jsx
import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/SignupForm.css';
import {v4 as uuidv4} from 'uuid';
import Footer from '../Footer.jsx';

function SignupForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        city: '',
        street: '',
        zipcode: '',
    });

    const [isEmailReadOnly, setEmailReadOnly] = useState(false);
    const [isPasswordReadOnly, setPasswordReadOnly] = useState(false);

    const generatePassword = () => {
        const uuid = uuidv4();
        return uuid.slice(0, 8);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');
        if (emailParam) {
            setForm(prevForm => ({...prevForm, email: emailParam}));
            setEmailReadOnly(true);
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/signup', form);
            if (response.data.success) {
                alert(response.data.message);
                navigate('/login');
            } else {
                console.log('회원 가입 실패');
                if (response.data.error) {
                    alert(response.data.error);
                }
            }
        } catch (error) {
            console.error('회원 가입 중 에러 발생:', error);
        }
    };

    return (
        <div className="SignupForm">
            <form onSubmit={handleSubmit}>
                <label>
                    <span>
                        Email:
                        <input type="email" name="email" value={form.email} onChange={handleChange} required
                               readOnly={isEmailReadOnly}/>
                    </span>
                </label>
                <label>
                    <span>
                        Password:
                        <input type="password" name="password" value={form.password} onChange={handleChange} required
                               readOnly={isPasswordReadOnly}/>
                    </span>
                </label>
                <label>
                    <span>
                        Name:
                        <input type="text" name="name" value={form.name} onChange={handleChange} required/>
                    </span>
                </label>
                <label>
                    <span>
                        Phone:
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange}/>
                    </span>
                </label>
                <label>
                    <span>
                        City:
                        <input type="text" name="city" value={form.city} onChange={handleChange}/>
                    </span>
                </label>
                <label>
                    <span>
                        Street:
                        <input type="text" name="street" value={form.street} onChange={handleChange}/>
                    </span>
                </label>
                <label>
                    <span>
                        Zipcode:
                        <input type="text" name="zipcode" value={form.zipcode} onChange={handleChange}/>
                    </span>
                </label>
                <input type="submit" value="회원가입"/>
            </form>
            <Footer/>
        </div>
    );
}

export default SignupForm;