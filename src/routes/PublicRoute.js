import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { authSelector } from '../features/auth/authSlice';

export default function PublicRoute(props) {
	const location = useLocation();
	const { isAuthenticated } = useSelector(authSelector);
	return isAuthenticated ? (
		<Redirect to={{ pathname: '/', state: { from: location } }} />
	) : (
		<Route {...props} />
	);
}
