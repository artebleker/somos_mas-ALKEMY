import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showActivity } from '../../Services/activitiesService';

const initialState = {
	activities: [],
	loading: false,
	error: false,
};

export const getActivitiesData = createAsyncThunk('activities/getActivities', async () => {
	try {
		const response = await showActivity();
		return response.data;
	} catch (error) {
		console.error(error);
	}
});

const activitiesSlice = createSlice({
	name: 'activities',
	initialState,
	reducers: {},
	extraReducers: {
		[getActivitiesData.pending]: state => {
			state.loading = true
		},
		[getActivitiesData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.activities = payload;
		},
		[getActivitiesData.rejected]: state => {
			state.loading = false;
			state.error = true;
		},
	}
})
export const activitiesSelector = state => state.activities
export default activitiesSlice.reducer