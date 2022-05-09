import React, { useEffect } from 'react';
import '../CardListStyles.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, usersSelector } from '../../features/users/usersSlice';
import Spinner from '../../shared/Spinner';
import showAlert from '../../shared/showAlert';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
import { MdModeEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { privateDeleteRequest } from '../../Services/privateApiService';
const UsersList = () => {
	const dispatch = useDispatch();
	const { users, loading, hasError } = useSelector(usersSelector);
	async function handleRemove(id) {
		try {
			await privateDeleteRequest({ url: `users/${id}` });
			showAlert({ type: 'success', title: 'Eliminado correctamente' });
		} catch (error) {
			showAlert({
				type: 'error',
				title: 'Ups! No se pudo eliminar la novedad',
			});
		}
	}
	useEffect(() => {
		dispatch(getUsers());
	}, []);

	if (hasError) {
		showAlert({
			type: 'error',
			title: 'Ups, hubo un error',
			message: 'No fue posible mostrar las novedades, intentelo mas tarde',
		});
	}
	return (
		<section>
			<HeaderBackoffice>
				<header className='news-header'>
					<h1>Listado de usuarios</h1>
					<Link
						to='/backoffice/create-users'
						className='primary-button'
						role='button'
					>
						Crear usuario
					</Link>
				</header>
				<table className='table-container three'>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Opciones</th>
					</tr>
					{loading ? (
						<Spinner />
					) : (
						users.map(element => {
							return (
								<tr key={element.id}>
									<td className='title'>{element.name}</td>
									<td>{element.email}</td>
									<td className='options'>
										<Link
											className='options__edit'
											to={{
												pathname: '/backoffice/create-users',
												state: element,
											}}
										>
											<MdModeEdit />
										</Link>
										<button onClick={() => handleRemove(element.id)}>
											<IoMdTrash />
										</button>
									</td>
								</tr>
							);
						})
					)}
				</table>
			</HeaderBackoffice>
		</section>
	);
};

export default UsersList;
