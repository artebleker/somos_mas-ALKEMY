import React, { useEffect, useState } from 'react';
import ShowTitle from './../../../shared/ShowTitle.js';
import './activitiesDetail.css';
import { useParams } from 'react-router-dom';
import Spinner from '../../../shared/Spinner.js';
import getDataMethodPrivate from '../../../Services/privateApiService.js';
import RenderHTML from '../../../shared/RenderHTML.js';

const ActivitiesDetail = () => {
	const [showDetail, setShowDetail] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id } = useParams();
	console.log('id', id);

	const getActivityDetail = async () => {
		// cambiarlo por el reducer despues
		try {
			const data = await getDataMethodPrivate(`activities/${id}`);
			console.log('datos', data.data.data);
			setShowDetail(data.data.data);
			console.log(data.data.data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getActivityDetail();
	}, []);

	return (
		//  className='activitiesDetail'
		<section>
			{loading && <Spinner />}
			{error && (
				<p>
					Ups. Ocurrio un error. No se pudieron mostrar los detalles de las
					actividades
				</p>
			)}
			<ShowTitle patchData={{ title: showDetail.name }} />
			<div>
				<img src={showDetail.image}></img>
			</div>
			{/* El renderHTML hace que la clase del <p> no sea tenida en cuenta */}
			<RenderHTML
				textHTML={`<p className='activitiesDetail-content'>${showDetail.description}</p>`}
			/>
		</section>
	);
};

export default ActivitiesDetail;
