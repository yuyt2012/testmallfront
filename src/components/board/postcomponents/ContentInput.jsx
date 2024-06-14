// ContentInput.jsx
import React from 'react';
import { TextField } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
const ContentInput = ({ content, setContent }) => (
    <TextField
        label="게시물 본문"
        value={content}
        onChange={e => setContent(e.target.value)}
        fullWidth
        multiline
    />
);

export default ContentInput;