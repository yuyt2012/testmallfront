// src/api/kakaoAuth.js

export const handleKakaoLogin = () => {
    const KAKAO_AUTH_URI = `http://localhost:8080/oauth2/authorization/kakao`;
    window.location.href = KAKAO_AUTH_URI;
};
