import React, { useEffect, useState } from 'react';
import './backofficeOrganization.css';
import { Link } from 'react-router-dom';
import LazyLoad from '../../shared/LazyLoad';
import { getDataMethod } from '../../Services/publicApiService';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
function OrganizationData() {
	const [organization, setOrganization] = useState({});
	const [statusData, setStatusData] = useState('idle');

	async function fetchOrganization() {
		setStatusData('loading');
		try {
			const { data } = await getDataMethod(
				process.env.REACT_APP_ORGANIZATION_ENDPOINT
			);
			console.log(data);
			if (!data.success) return setStatusData('error');
			setOrganization(data.data);
			setStatusData('success');
		} catch (error) {
			setStatusData('error');
			console.error(error);
		}
	}
	useEffect(() => {
		fetchOrganization();
	}, []);

	return (
		<HeaderBackoffice>
			<section className='backoffice_organization'>
				<header className='header'>Datos actuales de la organización</header>
				<div className='backoffice_organization--data '>
					{statusData === 'success' && (
						<>
							<LazyLoad
								src={organization.logo}
								alt={organization.name}
								width={200}
							/>
							<div>
								<h1>{organization.name}</h1>
								<div
									dangerouslySetInnerHTML={{
										__html: `<p>${organization.short_description}</p>`,
									}}
								></div>
							</div>
						</>
					)}
					{statusData === 'error' && <h1>Upps! Algo salio mal</h1>}
					{statusData === 'loading' && <div className='loader' />}
				</div>
				<div className='backoffice_organization--button'>
					<Link className='submit-btn' to='/backoffice/organization/edit'>
						Editar datos
					</Link>
				</div>
			</section>
		</HeaderBackoffice>
	);
}

export default OrganizationData;
