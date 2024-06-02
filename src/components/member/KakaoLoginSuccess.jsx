// kakaoLoginSuccess 페이지
import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const KakaoLoginSuccess = () => {
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // URL의 쿼리 파라미터에서 토큰을 가져옵니다.
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // 토큰을 localStorage에 저장합니다.
            localStorage.setItem('token', token);

            // 토큰에서 이메일을 추출합니다.
            const decodedToken = jwtDecode(token);
            const email = decodedToken.email;

            if (email) {
                const getToken = localStorage.getItem('token');
                console.log(getToken);
                axios.get('http://localhost:8080/kakaoLoginSuccess', {
                    params: {email: email},
                    headers: {'Authorization': `${getToken}`},
                })
                    .then(response => {
                        console.log(response.data);
                        if (response.data.message === "회원가입 필요") {
                            const email = response.data.email;
                            console.log(email);
                            navigate(`/kakaoSignupForm?email=${email}`); // 회원가입 페이지로 이동
                        } else if (response.data.message === "로그인 성공") {
                            alert('로그인 성공'); // 로그인 성공 알림 표시
                            setUser({...response.data.user,
                                role: response.data.role,
                                address: {
                                    city: response.data.city,
                                    street: response.data.street,
                                    zipcode: response.data.zipcode
                                }
                            }); // 사용자 정보 저장
                            navigate('/'); // 메인 페이지로 이동
                        }
                    })
                    .catch(error => {
                        console.error('로그인 중 에러 발생:', error);
                    });
            } else {
                console.error('이메일 정보가 없습니다.');
            }
        } else {
            console.error('토큰이 없습니다.');
        }
    }, [navigate]);
    return (
        <div>
            로그인 처리 중...
        </div>
    );
};

export default KakaoLoginSuccess;