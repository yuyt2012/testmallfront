// src/components/UserManagement.jsx
import React, {useState, useEffect} from 'react';
import {fetchMembers} from '../api/MemberListAPI.jsx';
import '../css/admin/UserManagement.css';
import {Link} from "react-router-dom";

const UserManagement = () => {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(0); // 현재 페이지를 추적하는 상태 변수

    useEffect(() => {
        const getMembers = async () => {
            const token = localStorage.getItem('token'); // 토큰 가져오기
            const membersData = await fetchMembers(10, page, token); // 현재 페이지를 인자로 전달
            setMembers(membersData);
        };

        getMembers();
    }, [page]); // 페이지가 변경될 때마다 회원 목록을 다시 가져옵니다.

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1); // 다음 페이지로 이동
    };

    const handlePrevPage = () => {
        setPage(prevPage => prevPage > 0 ? prevPage - 1 : prevPage); // 이전 페이지로 이동, 단 페이지는 0 이상이어야 함
    };

    return (
        <div>
            <h1>회원관리 페이지</h1>
            <Link to="/admin" style={{position: '', right: 0}}>관리자페이지</Link> {/* 오른쪽 상단에 위치한 Admin 버튼 */}
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Address</th>
                    <th>Social Login</th>
                </tr>
                </thead>
                <tbody>
                {(members || []).map((member, index) => (
                    <tr key={index}>
                        <td>{member.id}</td>
                        <td>{member.email}</td>
                        <td>{member.name}</td>
                        <td>{member.phone}</td>
                        <td>{member.role}</td>
                        <td>{member.address.street} {member.address.zipcode} {member.address.city}</td>
                        <td>{member.socialLogin}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handlePrevPage}>이전 페이지</button>
            <button onClick={handleNextPage}>다음 페이지</button>
        </div>
    );
}

export default UserManagement;