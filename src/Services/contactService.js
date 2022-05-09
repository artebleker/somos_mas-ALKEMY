import getDataMethodPrivate, {
	privatePatchRequest,
	privateDeleteRequest,
	privatePostRequest,
} from './privateApiService';
export async function getAllContacts() {
	try {
		const { data } = await getDataMethodPrivate(
			process.env.REACT_APP_CONTACT_ENDPOINT
		);
		return data;
	} catch (error) {
		return error;
	}
}

export async function createContact(contactData) {
	try {
		const data = await privatePostRequest(
			process.env.REACT_APP_CONTACT_ENDPOINT,
			contactData
		);
		return data;
	} catch (error) {
		return error;
	}
}
export async function getContactById(id) {
	try {
		const { data } = await getDataMethodPrivate(
			process.env.REACT_APP_CONTACT_ENDPOINT,
			id
		);
		return data;
	} catch (error) {
		return error;
	}
}
export async function updateContact(id, contactData) {
	try {
		const data = await privatePatchRequest(
			`${process.env.REACT_APP_CONTACT_ENDPOINT}/${id}`,
			contactData
		);
		return data;
	} catch (error) {
		return error;
	}
}

export async function deleteContact(id) {
	try {
		const { data } = await privateDeleteRequest({
			url: `${process.env.REACT_APP_CONTACT_ENDPOINT}/${id}`,
		});
		return data;
	} catch (error) {
		return error;
	}
}
