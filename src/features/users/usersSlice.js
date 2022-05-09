import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDataMethod } from '../../Services/publicApiService';

const initialState = {
	users: [],
	loading: false,
	hasError: false,
};
// Thunks
export const getUsers = createAsyncThunk('users/getUsers', async () => {
	const { data } = await getDataMethod('users');
	return data.data;
});

// Slice
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[getUsers.pending]: state => {
			state.loading = true;
		},
		[getUsers.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.users = payload;
		},
		[getUsers.rejected]: state => {
			state.loading = false;
			state.hasError = true;
		},
	},
});

export const usersSelector = state => state.users;
export default userSlice.reducer;
