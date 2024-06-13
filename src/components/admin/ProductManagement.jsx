import React, {useState, useEffect} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {getProductList} from "../api/ProductGetAPI.jsx";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CommonHeader from "../CommonHeader.jsx";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ProductManagement = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const fetchedProducts = await getProductList(10, page, token);
            if (fetchedProducts && Array.isArray(fetchedProducts.content)) {
                setProducts(fetchedProducts.content);
                setTotalPages(fetchedProducts.totalPages);
            } else {
                console.error('fetchedProducts.content is not an array:', fetchedProducts);
            }
        };

        fetchProducts();
    }, [page]);

    const handleIdClick = (id) => {
        navigate(`/product-edit/${id}`);
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        setPage(page - 1);
    };

    const links = [
        {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
    ];

    return (
        <>
            <CommonHeader links={links}/>
            <div>
                <h1>상품관리 페이지</h1>
                <Box style={{position: 'relative', bottom: '10px'}} display="flex" justifyContent="flex-end">
                    <Button style={{position: 'relative', right: '20px'}} component={RouterLink}
                            to="/admin/product-register" variant="contained" color="secondary">상품등록</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Stock Quantity</TableCell>
                                <TableCell align="center">Is Sold Out</TableCell>
                                <TableCell align="center">Parent Category</TableCell>
                                <TableCell align="center">Child Category</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Registration Date</TableCell>
                                <TableCell align="center">Update Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell align="center"
                                               onClick={() => handleIdClick(product.id)}>{product.id}</TableCell>
                                    <TableCell align="center">{product.name}</TableCell>
                                    <TableCell align="center">{product.price}</TableCell>
                                    <TableCell align="center">{product.stockQuantity}</TableCell>
                                    <TableCell align="center">{product.soldOut ? "품절" : "재고 있음"}</TableCell>
                                    <TableCell align="center">{product.parentCategoryName}</TableCell>
                                    <TableCell align="center">{product.subCategoryNames.join(', ')}</TableCell>
                                    <TableCell align="center">{product.description}</TableCell>
                                    <TableCell
                                        align="center">{new Date(product.regDate).toLocaleDateString()}</TableCell>
                                    <TableCell
                                        align="center">{new Date(product.updateDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box style={{position: 'relative', top: '10px'}} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={handlePreviousPage} disabled={page === 0}>이전
                        페이지</Button>
                    <Button variant="contained" color="secondary" onClick={handleNextPage}
                            disabled={page >= totalPages - 1}>다음 페이지</Button>
                </Box>
            </div>
        </>
    );
};

export default ProductManagement;