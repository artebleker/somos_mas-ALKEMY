import React, { useEffect, useState } from 'react';
import '../CardListStyles.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsData, newsSelector } from '../../features/news/newSlice';
import Spinner from '../../shared/Spinner';
import showAlert from '../../shared/showAlert';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
import { MdModeEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { privateDeleteRequest } from '../../Services/privateApiService';
const NewsList = () => {
	const dispatch = useDispatch();
	const { news, loading, hasError } = useSelector(newsSelector);
	const [deletedNew, setDeletedNew] = useState(false);
	async function handleRemove(id) {
		try {
			await privateDeleteRequest({ url: `news/${id}` });
			showAlert({ type: 'success', title: 'Eliminado correctamente' });
			setDeletedNew(true);
		} catch (error) {
			showAlert({
				type: 'error',
				title: 'Ups! No se pudo eliminar la novedad',
			});
		}
	}
	useEffect(() => {
		dispatch(getNewsData());
		if (deletedNew) {
			setDeletedNew(false);
		}
	}, [deletedNew]);

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
					<h1>Listado de Novedades</h1>
					<Link
						to='/backoffice/create-news'
						className='primary-button'
						role='button'
					>
						Crear novedad
					</Link>
				</header>
				<table className='table-container'>
					<tr>
						<th>Imagen</th>
						<th>Titulo</th>
						<th>Creado el</th>
						<th>Opciones</th>
					</tr>
					{console.log(news)}
					{loading ? (
						<Spinner />
					) : (
						news.map(element => {
							return (
								<tr key={element.id}>
									<td>
										<img src={element.image} alt={element.name} />
									</td>
									<td className='title'>{element.name}</td>
									<td>{new Date(element.created_at).toLocaleDateString()}</td>
									<td className='options'>
										<Link
											className='options__edit'
											to={{
												pathname: '/backoffice/create-news',
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

export default NewsList;
