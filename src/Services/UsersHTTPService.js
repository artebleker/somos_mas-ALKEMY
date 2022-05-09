import getDataMethodPrivate, {
	privatePostRequest,
	privatePutRequest,
	privatePatchRequest,
	privateDeleteRequest,
} from './privateApiService';

// Get
const getAllUsers = async (data = null) => {
	try {
		const response = await getDataMethodPrivate('users', data);
		return response;
	} catch (error) {
		console.error(error);
	}
};

// Post
export const createUser = async data => {
	try {
		const response = await privatePostRequest('register', data);
		return response;
	} catch (error) {
		console.error(error);
	}
};

// Get {id}
const getUser = async (id, data = null) => {
	try {
		const response = await getDataMethodPrivate(`users/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

// Put {id}
const updateUser = async (id, data) => {
	try {
		const response = await privatePutRequest(
			`${process.env.REACT_APP_USERS_ENDPOINT}/${id}`,
			data
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

// Patch {id}
const patchUser = async (id, data) => {
	try {
		const response = await privatePatchRequest(
			`${process.env.REACT_APP_USERS_ENDPOINT}/${id}`,
			data
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

// Delete {id}
const removeUser = async (id, data) => {
	try {
		const response = await privateDeleteRequest(
			`${process.env.REACT_APP_USERS_ENDPOINT}/${id}`,
			data
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const loginUser = async data => {
	try {
		const response = await privatePostRequest(
			process.env.REACT_APP_LOGIN_ENDPOINT,
			data
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export default {
	getAllUsers,
	getUser,
	updateUser,
	patchUser,
	removeUser,
};
