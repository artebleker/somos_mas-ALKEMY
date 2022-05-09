import showAlert from '../shared/showAlert';

// todos son metodos privados

import getDataMethodPrivate, {
	privateDeleteRequest,
	privatePatchRequest,
	privatePostRequest,
	privatePutRequest,
} from './privateApiService';

/**
 * metodo get
 * Muestra varias o una activdad actividad.
 * @param {number} id - recive opcionalmente un id para mostrar una actividad en especifico
 */

const showActivity = async id => {
	try {
		const response = await getDataMethodPrivate(
			process.env.REACT_APP_ACTIVITY_END_POINT,
			id
		);
		return response;
	} catch (error) {
		showAlert({type: 'error', title: 'Error', message: error.message});
		console.log(error);
	}
};

/**
 * metodo post
 * Crea una nueva actividad.
 * @param {Object} data - informacion para crear la actividad
 */

const createActivity = async data => {
	try {
		const response = await privatePostRequest(
			process.env.REACT_APP_ACTIVITY_END_POINT,
			data
		);
		return response;
	} catch (error) {
		showAlert({type: 'error', title: 'Error', message: error.message});
		console.log(error);
	}
};

/**
 * metodo path
 * Actualiza UNICAMENTE los campos que se ven modificados.
 * @param {string} url - recive la url del dato a ser actualizado
 * @param {Object} data - el objeto que contiene la nueva informacion
 */

const updateActivity = async (url, data) => {
	try {
		const response = await privatePatchRequest(url, data);
		return response;
	} catch (error) {
		showAlert({type: 'error', title: 'Error', message: error.message});
		console.log(error);
	}
};

/**
 * metodo delete
 * Elimina una actividad en concreto, dependiendo del id (url).
 * @param {string} url - url de activities + el id correspondiente
 */

const deleteActivity = async url => {
	try {
		const response = await privateDeleteRequest(url);
		return response;
	} catch (error) {
		showAlert({type: 'error', title: 'Error', message: error.message});
		console.log(error);
	}
};

/**
 * Metodo put
 * Actualiza todos los campos aunque no se vean modificados.
 * @param {string} url - recive la url del dato a ser actualizado
 * @param {Object} data - el objeto que contiene la nueva informacion
 */

const updateAllActivity = async (url, data) => {
	try {
		const response = await privatePutRequest(url, data);
		return response;
	} catch (error) {
		showAlert({type: 'error', title: 'Error', message: error.message});
		console.log(error);
	}
};

export {
	showActivity,
	createActivity,
	updateActivity,
	updateAllActivity,
	deleteActivity,
};
