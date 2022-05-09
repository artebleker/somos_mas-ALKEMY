import getDataMethodPrivate, {
	privateDeleteRequest,
	privatePatchRequest,
	privatePostRequest,
	privatePutRequest,
} from './privateApiService';

// Method get

const getSlide = async id => {
	try {
		const response = await getDataMethodPrivate(
			process.env.REACT_APP_SLIDES_ENDPOINT,
			id
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// Method post

const createSlide = async data => {
	try {
		const response = await privatePostRequest(
			process.env.REACT_APP_SLIDES_ENDPOINT,
			data
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// Method patch

const updateSlide = async (url, data) => {
	try {
		const response = await privatePatchRequest(url, data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// Method delete

const deleteSlide = async url => {
	try {
		const response = await privateDeleteRequest(url);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// Method put

const updateAllSlide = async (url, data) => {
	try {
		const response = await privatePutRequest(url, data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export { getSlide, createSlide, updateSlide, updateAllSlide, deleteSlide };
