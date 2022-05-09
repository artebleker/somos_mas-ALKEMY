import React from 'react';
import { Link } from 'react-router-dom';
import '../CardListStyles.css';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
import { MdModeEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

const ActivitiesList = () => {
	const defaultImage =
		'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
	const activitiesMock = [
		{
			id: 2,
			name: 'Titulo de prueba',
			image: defaultImage,
			createdAt: '30/03/2022',
			description: 'Descripcion de prueba',
		},
		{
			id: 1,
			name: 'Titulo de prueba',
			image: defaultImage,
			createdAt: '30/03/2022',
			description: 'Descripcion de prueba',
		},
		{
			id: 3,
			name: 'Titulo de prueba',
			image: defaultImage,
			createdAt: '30/03/2022',
			description: 'Descripcion de prueba',
		},
	];

	return (
		<section>
			<HeaderBackoffice>
				<header className='news-header'>
					<h1>Listado Actividades</h1>
					<Link
						to='/backoffice/activities/create'
						className='primary-button'
						role='button'
					>
						Crear Actividad
					</Link>
				</header>
				<table className='table-container'>
					<tr>
						<th>Imagen</th>
						<th>Titulo</th>
						<th>Creado el</th>
						<th>Opciones</th>
					</tr>
					{activitiesMock.length > 0 ? (
						activitiesMock.map(element => {
							return (
								<tr key={element.id}>
									<td>
										<img src={element.image} alt={element.name} />
									</td>
									<td className='title'>{element.name}</td>
									<td>{element.createdAt}</td>
									<td className='options'>
										<button>
											<MdModeEdit />
										</button>
										<button>
											<IoMdTrash />
										</button>
									</td>
								</tr>
							);
						})
					) : (
						<p>No hay Actividades</p>
					)}
				</table>
			</HeaderBackoffice>
		</section>
	);
};

export default ActivitiesList;
