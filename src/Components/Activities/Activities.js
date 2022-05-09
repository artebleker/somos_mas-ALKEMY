import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDataMethod } from '../../Services/publicApiService';
import ShowTitle from '../../shared/ShowTitle';
import Spinner from '../../shared/Spinner';
import LayoutPublic from '../LayoutPublic/LayoutPublic';

const Activities = () => {
	const [activitiesData, setActivitiesData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const getData = async () => {
		try {
			const data = await getDataMethod('activities');
			console.log('datos', data.data.data);
			setActivitiesData(data.data.data);
		} catch (error) {
			console.log(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
		<LayoutPublic>
			<div>
				<ShowTitle patchData={{ title: 'Actividades' }}></ShowTitle>
			</div>
			{loading && <Spinner />}
			{error && (
				<p>
					Ups. Hubo un error. No se pudieron mostrar las actividades. Pronto
					sera solucionado
				</p>
			)}
			{activitiesData.map(el => (
				<div key={el.id}>
					<h1>{el.name}</h1>
					<img src={el.image} alt={el.name} width='150px' height='150px'></img>
					<div>
						<Link to={`/actividades/${el.id}`}>
							<button>Detalles</button>
						</Link>
					</div>
				</div>
			))}
			</LayoutPublic>
		</>

	);
};

export default Activities;
