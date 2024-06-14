// Board.jsx
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    Container,
    TextField
} from '@material-ui/core';
import CommonHeader from "../CommonHeader.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getPostList} from "../api/BoardAPI.jsx";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const Board = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const sortedPosts = [...posts].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
    const token = localStorage.getItem('token');
    const [page, setPage] = useState(0); // Add a state variable for the current page
    const [totalPages, setTotalPages] = useState(0);

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPostList(10, page, token); // Call the getPostList function
            console.log(posts);
            setPosts(posts.content);
            setTotalPages(posts.totalPages);
        };

        fetchPosts();
    }, [page]);


    const filteredPosts = sortedPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const links = [
        {text: '뒤로가기'},
    ];

    const handleRegisterPostClick = () => {
        navigate('/board/post/register');
    }

    const handleNextPageClick = () => {
        if (page < totalPages - 1) { // Check if there are more pages
            setPage(page + 1); // Go to the next page
        }
    }

    const handlePrevPageClick = () => {
        if (page > 0) { // Check if there are previous pages
            setPage(page - 1); // Go to the previous page
        }
    }

    return (
        <>
            <CommonHeader links={links}/>

            <Container style={{position: 'relative', bottom: '50px', minHeight: '120vh'}}>
                <Box>
                    <Button style={{position: 'relative', right: '-84%', top: '95px'}} variant={"contained"}
                            color={"primary"} onClick={handleRegisterPostClick}>글쓰기</Button>
                </Box>
                <Container>
                    <TableContainer style={{
                        position: 'relative',
                        top: '130px',
                        width: '100%',
                        maxWidth: '80%',
                        marginRight: 'auto',
                        marginLeft: 'auto'
                    }} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: '10%'}} align={"center"}>ID</TableCell>
                                    <TableCell style={{width: '60%'}} align={"center"}>제목</TableCell>
                                    <TableCell style={{width: '15%'}} align={"center"}>글쓴이</TableCell>
                                    <TableCell style={{width: '15%'}} align={"center"}>등록일</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell style={{width: '10%'}} align={"center"} component="th"
                                                       scope="row">
                                                {post.id}
                                            </TableCell>
                                            <TableCell style={{width: '60%'}} align={"center"}>
                                                <Link to={`/board/post/${post.id}`}>{post.title}</Link>
                                            </TableCell>
                                            <TableCell style={{width: '15%'}} align={"center"}>{post.writer}</TableCell>
                                            <TableCell style={{width: '15%'}}
                                                       align={"center"}>{post.regDate}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell style={{position: 'relative', height: '500px'}} colSpan={4}
                                                   align={"center"}>
                                            게시물이 없습니다.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="contained" color="primary" onClick={handlePrevPageClick}>
                                이전 페이지
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNextPageClick}>
                                다음 페이지
                            </Button>
                        </Box>
                    </TableContainer>
                </Container>
                <Box style={{
                    position: 'relative',
                    top: '160px',
                    left: '90%',
                    transform: 'translateX(-50%)',
                    display: 'flex'
                }}>
                    <TextField
                        label="검색"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button variant="contained" color="primary">
                        검색
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default Board;