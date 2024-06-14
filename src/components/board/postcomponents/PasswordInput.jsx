// PasswordInput.jsx
import React from 'react';
import { TextField } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ password, setPassword }) => (
    <TextField
        label="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        type="password"
        inputProps={{ maxLength: 4 }}
    />
);

export default PasswordInput;