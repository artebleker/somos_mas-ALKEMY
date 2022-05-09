import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSlide } from '../../Services/slidesService';

const initialState = {
	slides: [],
	loading: false,
	error: false,
};

export const getSlideData = createAsyncThunk('slides/getSlides', async () => {
	try {
		const res = await getSlide();
		return res.data;
	} catch (err) {
		console.log(err);
	}
});

const slidesSlice = createSlice({
	name: 'slides',
	initialState,
	reducers: {},
	extraReducers: {
		[getSlideData.pending]: state => {
			state.loading = true;
		},
		[getSlideData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.slides = payload;
		},
		[getSlideData.rejected]: state => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const slidesSelector = state => state.slides;
export default slidesSlice.reducer;
