import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDataMethod } from '../../Services/publicApiService';

const initialState = {
	data: [],
	loading: false,
	error: false,
};

export const getData = createAsyncThunk('data/getData', async () => {
	const { data } = await getDataMethod(process.env.REACT_APP_ORGANIZATION_ENDPOINT);
	return data.data;
});

export const usSlice = createSlice({
	name: 'us',
	initialState,
	reducers: {},
	extraReducers: {
		[getData.pending]: state => {
			state.loading = true;
		},
		[getData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.data = payload;
		},
		[getData.rejected]: state => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const usersSelector = state => state.data;
export default usSlice.reducer;