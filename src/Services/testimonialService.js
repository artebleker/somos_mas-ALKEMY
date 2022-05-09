import showAlert from '../shared/showAlert';
import getDataMethodPrivate, {
	privatePatchRequest,
	privateDeleteRequest,
	privatePostRequest,
	privatePutRequest,
} from './privateApiService';
export async function getAllTestimonials() {
	try {
		const { data } = await getDataMethodPrivate(
			process.env.REACT_APP_TESTIMONIAL_END_POINT
		);
		// Maneja el error y la alerta. La funcion se encuentra abajo de todo
		handleError(data, 'No se pudieron mostrar los testimonios');

		return data;
	} catch (error) {
		return error;
	}
}

export async function createTestimonial(contactData) {
	try {
		const data = await privatePostRequest(
			process.env.REACT_APP_TESTIMONIAL_END_POINT,
			contactData
		);

		handleError(data, 'Lo sentimos, no fue posible cargar los testimonios');

		return data;
	} catch (err) {
		// este catch no funciona
		console.log(err);
	}
}
export async function getTestimonialById(id) {
	try {
		const { data } = await getDataMethodPrivate(
			process.env.REACT_APP_TESTIMONIAL_END_POINT,
			id
		);

		handleError(data, 'Lo sentimos, no fue posible mostrar los resultados');

		return data;
	} catch (error) {
		return error;
	}
}
export async function updateTestimonial(id, contactData) {
	try {
		const data = await privatePatchRequest(
			`${process.env.REACT_APP_TESTIMONIAL_END_POINT}/${id}`,
			contactData
		);

		handleError(data, 'Lo sentimos, no fue posible actualizar los testimonios');

		return data;
	} catch (error) {
		return error;
	}
}

export async function deleteTestimonial(id) {
	try {
		const { data } = await privateDeleteRequest({
			url: `${process.env.REACT_APP_TESTIMONIAL_END_POINT}/${id}`,
		});

		handleError(data, 'Lo sentimos, no fue posible eliminar el testimonio');

		return data;
	} catch (error) {
		return error;
	}
}

export async function updateAllTestimonial(id, data) {
	try {
		const response = await privatePutRequest(
			`${process.env.REACT_APP_TESTIMONIAL_END_POINT}/${id}`,
			data
		);

		handleError(data, 'Lo sentimos, no fue posible actualizar los testimonios');

		return response;
	} catch (error) {
		console.log(error);
	}
}

// esta funcion maneja y muestra el error por si la peticion falla
// Solo se ejecuta si la condicion interna es verdadera

const handleError = (data, message) => {
	// se utiliza la propiedad "success" que devuelve el back par comprar si la peticion falla
	if (data.success !== true) {
		console.log('el Error se muestra Exitosamente');
		showAlert({
			type: 'error',
			title: 'Ups. Hubo un error.',
			message: message,
		});
	}
};
