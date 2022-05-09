import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNews } from '../../Services/newService';

const initialState = {
	news: [],
	loading: false,
	error: false,
};

export const getNewsData = createAsyncThunk('news/getNews', async () => {
	try {
		const response = await getNews();
		return response.data.data;
	} catch (error) {
		throw new Error('News slice error to get data');
	}
});

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: {
		[getNewsData.pending]: state => {
			state.loading = true;
		},
		[getNewsData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.news = payload;
		},
		[getNewsData.rejected]: state => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const newsSelector = state => state.news;
export default newsSlice.reducer;
