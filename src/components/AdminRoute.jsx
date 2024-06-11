import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

// eslint-disable-next-line react/prop-types
function AdminRoute({ element, ...rest }) {
    const { user } = useContext(AuthContext);

    return (
        <Route {...rest} element={user && user.role === 'ADMIN' ? element : <Navigate to="/login" />} />
    );
}

export default AdminRoute;