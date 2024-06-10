import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import {TextField, Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CommonHeader from "../CommonHeader.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const links = [
    {text: '뒤로가기'}, // 실제 경로로 교체해야 합니다.
];

function MyInfo() {
    const classes = useStyles();
    const {user} = useContext(AuthContext);

    return (
        <>
            <CommonHeader links={links}/>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container direction="column" alignItems="center">
                    <TextField label="Email" value={user.email} InputProps={{readOnly: true}}/>
                    <TextField label="Name" value={user.name} InputProps={{readOnly: true}}/>
                    <TextField label="Role" value={user.role} InputProps={{readOnly: true}}/>
                    <TextField label="Phone" value={user.phone} InputProps={{readOnly: true}}/>
                    <TextField label="주소" value={user.city} InputProps={{readOnly: true}}/>
                    <TextField label="상세주소" value={user.street} InputProps={{readOnly: true}}/>
                    <TextField label="우편번호" value={user.zipcode} InputProps={{readOnly: true}}/>
                    <TextField label="Social Login" value={user.socialLogin} InputProps={{readOnly: true}}/>
                    <Grid item>
                        <Button variant="contained" color="primary" component={RouterLink} to="/edit">수정</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default MyInfo;