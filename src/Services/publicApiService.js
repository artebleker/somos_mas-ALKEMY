import axios from 'axios';
/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "/testimonials"
 * @param {Object} postData Object with the post data
 */
async function publicPostRequest(route, postData) {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/${route}`,
			postData
		);
		return data;
	} catch (error) {
		return error;
	}
}

const getDataMethod = async (sector, id = null, data = null) => {
	if (sector !== 'auth') {
		try {
			const result = await axios.get(
				id
					? `${process.env.REACT_APP_BASE_URL}/${sector}/${id}`
					: `${process.env.REACT_APP_BASE_URL}/${sector}`,
				data
			);
			console.log(result);
			return result;
		} catch (error) {
			console.error(error);
		}
	} else {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/auth/me`,
				data
			);
			console.log(result);
			return result;
		} catch (error) {
			console.error(error);
		}
	}
};

export { publicPostRequest, getDataMethod };
