// TitleInput.jsx
import React from 'react';
import { TextField } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
const TitleInput = ({ title, setTitle }) => (
    <TextField
        label="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
    />
);

export default TitleInput;