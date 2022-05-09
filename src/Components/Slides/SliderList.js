import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
import { MdModeEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

const SliderList = () => {
	const data = [
		{
			id: 1,
			image: 'https://i.ibb.co/tBTkL9p/askpopo.png',
			name: 'slider 1',
			createdAt: '2022-15-01',
		},
		{
			id: 2,
			image: 'https://i.ibb.co/tBTkL9p/askpopo.png',
			name: 'slider 2',
			createdAt: '2022-15-01',
		},
		{
			id: 3,
			image: 'https://i.ibb.co/tBTkL9p/askpopo.png',
			name: 'slider 3',
			createdAt: '2022-15-01',
		},
	];

	return (
		<HeaderBackoffice>
			<header className='news-header'>
				<h1>Listado de Slides</h1>
				<Link
					to='/backoffice/create-slide'
					role='button'
					className='primary-button'
				>
					Crear Slider
				</Link>
			</header>
			<table className='table-container'>
				<tr>
					<th scope='col'>Order</th>
					<th scope='col'>Nombre</th>
					<th scope='col'>Image</th>
					<th scope='col'>Creado</th>
					<th scope='col'>Editar</th>
					<th scope='col'>Eliminar</th>
				</tr>

				{data.length > 0 ? (
					data.map(el => (
						<tr key={el.id}>
							<td>
								<img src={el.image} alt={el.name} />
							</td>
							<td className='title'>{el.name}</td>
							<td>{el.createdAt}</td>
							<td className='options'>
								<button>
									<MdModeEdit />
								</button>
								<button>
									<IoMdTrash />
								</button>
							</td>
						</tr>
					))
				) : (
					<span>No hay datos para mostrar</span>
				)}
			</table>
		</HeaderBackoffice>
	);
};

export default SliderList;
