import React, {useState, useEffect} from 'react';
import {fetchMembers} from '../api/MemberListAPI.jsx';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";

const UserManagement = () => {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(0); // 현재 페이지를 추적하는 상태 변수
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수를 추적하는 상태 변수

    useEffect(() => {
        const getMembers = async () => {
            const token = localStorage.getItem('token'); // 토큰 가져오기
            const membersData = await fetchMembers(10, page, token); // 현재 페이지를 인자로 전달

            // fetchMembers 함수가 반환하는 데이터가 배열 형태인 경우
            if (Array.isArray(membersData)) {
                setMembers(membersData);
                // 총 페이지 수를 얻는 방법은 API에 따라 다를 수 있습니다.
                // 예를 들어, API가 헤더에 총 페이지 수를 반환하는 경우 다음과 같이 사용할 수 있습니다:
                // setTotalPages(parseInt(response.headers.get('X-Total-Pages'), 10));
            } else if (membersData && membersData.members && typeof membersData.totalPages === 'number') {
                // fetchMembers 함수가 반환하는 데이터가 {members: [], totalPages: 0}와 같은 형태인 경우
                setMembers(membersData.members);
                setTotalPages(membersData.totalPages);
            } else {
                console.error('Unexpected format of membersData:', membersData);
            }
        };

        getMembers();
    }, [page]); // 페이지가 변경될 때마다 회원 목록을 다시 가져옵니다.

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(prevPage => prevPage + 1); // 다음 페이지로 이동
        }
    };

    const handlePrevPage = () => {
        setPage(prevPage => prevPage > 0 ? prevPage - 1 : prevPage); // 이전 페이지로 이동, 단 페이지는 0 이상이어야 함
    };

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <div>
                <h1>회원관리 페이지</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Social Login</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(members || []).map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{member.id}</TableCell>
                                    <TableCell align="center">{member.email}</TableCell>
                                    <TableCell align="center">{member.name}</TableCell>
                                    <TableCell align="center">{member.phone}</TableCell>
                                    <TableCell align="center">{member.role}</TableCell>
                                    <TableCell
                                            align="center">{member.address.city} {member.address.street} {member.address.zipcode}</TableCell>
                                    <TableCell align="center">{member.socialLogin}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box style={{position: 'relative', top: '10px'}} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={handlePrevPage} disabled={page === 0}>이전 페이지</Button>
                    <Button variant="contained" color="secondary" onClick={handleNextPage} disabled={page >= totalPages - 1}>다음 페이지</Button>
                </Box>
            </div>
        </>
    );
}

export default UserManagement;