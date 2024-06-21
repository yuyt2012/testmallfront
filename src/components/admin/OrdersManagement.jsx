import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CommonHeader from "../CommonHeader.jsx";
import {getOrders, updateDeliveryStatus} from "../api/OrderAPI.jsx";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const OrdersManagement = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const fetchedOrders = await getOrders(10, page, token);
            if (fetchedOrders && Array.isArray(fetchedOrders.content)) {
                setOrders(fetchedOrders.content);
                setTotalPages(fetchedOrders.totalPages);
            } else {
                console.error('fetchedOrders.content is not an array:', fetchedOrders);
            }
        };
        fetchOrders();
    }, [page]);

    const handleDeliveryStatusClick = (order) => {
        setSelectedOrder(order);
        setDeliveryStatus(order.deliveryStatus);
        setOpen(true);
    };

    const handleDeliveryStatusChange = (event) => {
        setDeliveryStatus(event.target.value);
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        const UpdateDeliveryStatusDTO = {
            orderId: selectedOrder.orderId,
            deliveryStatus: deliveryStatus
        }
        const response = await updateDeliveryStatus(UpdateDeliveryStatusDTO, token);
        if (response === 'success') {
            alert('배송 상태가 업데이트되었습니다.');
            setOpen(false);
            // 주문 목록을 새로 가져옵니다.
        } else {
            alert('배송 상태 업데이트에 실패했습니다.');
        }
    };

    const handleClose = () => {
        setOpen(false);
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
                <h1>주문관리 페이지</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">주문 번호</TableCell>
                                <TableCell align="center">주문 회원</TableCell>
                                <TableCell align="center">주문 상태</TableCell>
                                <TableCell align="center">배송 상태</TableCell>
                                <TableCell align="center">결제 금액</TableCell>
                                <TableCell align="center">주문 날짜</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell align="center">{order.orderId}</TableCell>
                                    <TableCell align="center">{order.email}</TableCell>
                                    <TableCell align="center">{order.orderStatus}</TableCell>
                                    <TableCell align="center"
                                               onClick={() => handleDeliveryStatusClick(order)}>{order.deliveryStatus}</TableCell>
                                    <TableCell align="center">{order.totalPrice}</TableCell>
                                    <TableCell
                                        align="center">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>배송 상태를 변경하세요</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            배송 상태를 변경하려면 아래에서 선택하세요.
                        </DialogContentText>
                        <Select
                            value={deliveryStatus}
                            onChange={handleDeliveryStatusChange}
                        >
                            <MenuItem value={"SHIPPING"}>배송 중</MenuItem>
                            <MenuItem value={"COMP"}>배송 완료</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>취소</Button>
                        <Button onClick={handleUpdate}>수정</Button>
                    </DialogActions>
                </Dialog>
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

export default OrdersManagement;