import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUser from '../../Services/UsersHTTPService';

const initialState = {
	user: null,
	isAuthenticated: false,
	token: null,
	isLoading: false,
	error: null,
};

const getUserAuthenticated = createAsyncThunk('auth/getUser', async id => {
	try {
		const response = await getUser(id);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[getUserAuthenticated.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getUserAuthenticated.login]: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.isLoading = false;
		},
		[getUserAuthenticated.register]: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.isLoading = false;
		},
		[getUserAuthenticated.logout]: (state, action) => {
			state.user = null;
			state.isAuthenticated = false;
			state.token = null;
			state.isLoading = false;
		},
		[getUserAuthenticated.rejected]: (state, action) => {
			state.error = action.error;
			state.isLoading = false;
		},
	},
});

export const authSelector = state => state.auth;
export default authSlice.reducer;
