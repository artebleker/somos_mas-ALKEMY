import React, { useEffect, useState } from 'react';
import './NewsDetail.css';
import { useHistory, useParams } from 'react-router-dom';
import { getNewsId } from '../../../Services/newService';
import Spinner from '../../../shared/Spinner';
import RenderHTML from '../../../shared/RenderHTML';
import BotonRegresar from '../../../shared/BotonRegresar';
export default function NewsDetail() {
	const [newStatus, setNewStatus] = useState('idle');
	const [singleNew, setSigleNew] = useState();
	const history = useHistory();
	function handlePrevNavigtation() {
		history.goBack();
	}
	const { id } = useParams();
	useEffect(() => {
		async function fetchNew() {
			setNewStatus('loading');
			try {
				const { data } = await getNewsId(id);
				if (!data.success) return setNewStatus('error');
				setSigleNew(data.data);
				setNewStatus('success');
			} catch (error) {
				console.error(error);
				setNewStatus('error');
			}
		}
		fetchNew();
	}, []);

	return (
		<section className='news__detail'>
			<header>
				<span onClick={handlePrevNavigtation}>
					<i className='fa-solid fa-angle-left' />
				</span>
				Novedades
				<BotonRegresar/>
			</header>
			{newStatus === 'loading' && <Spinner />}
			{newStatus === 'error' && (
				<p>Upps! No pudimos encontrar esta novedad 📰</p>
			)}
			{newStatus === 'success' && (
				<>
					<img src={singleNew.image} alt={singleNew.name} />
					<div className='news__detail--content'>
						<h1>{singleNew.name}</h1>
						<RenderHTML textHTML={singleNew.content} />
					</div>
				</>
			)}
		</section>
	);
}
