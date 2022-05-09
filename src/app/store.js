import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usReducer from '../features/us/usReducer';
import newsReducer from '../features/news/newSlice';
import usersReducer from '../features/users/usersSlice';
import slidesReducer from '../features/Slides/slideSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		news: newsReducer,
		slides: slidesReducer,
		activities: activitiesReducer,
		auth: authReducer,
    us: usReducer,
    users: usersReducer,
	},
});
