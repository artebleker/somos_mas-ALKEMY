import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { authSelector } from '../features/auth/authSlice';

export default function ProtectedRoutes(props) {
	const location = useLocation();
	const { isAuthenticated } = useSelector(authSelector);
	return !isAuthenticated ? (
		<Route {...props} />
	) : (
		<Redirect
			to={{
				pathname: '/',
				state: { from: location },
			}}
		/>
	);
}
