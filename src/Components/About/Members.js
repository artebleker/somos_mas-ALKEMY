import React, { useEffect, useState } from 'react';
import { getDataMethod } from '../../Services/publicApiService';
import MemberList from './MemberList';

const Members = () => {
	const [members, setMembers] = useState([]);
	const [error, setError] = useState({ text: '', valid: null });
	const errorText =
		'No se pudo mostrar los miembros de la ONG debido a un problema, intentelo mas tarde';

	const getMembers = async () => {
		try {
			const data = await getDataMethod('members');
			console.log('data:', data.data.data);
			setMembers(data.data.data);
		} catch (error) {
			console.log(error);
			setError({
				text: errorText,
				valid: true,
			});
		}
	};

	useEffect(() => {
		getMembers();
	}, []);

	return (
		<>
			{error.valid && <p>{error.text}</p>}
			{members.map(el => (
				<MemberList
					key={el.id}
					image={el.image}
					name={el.name}
					description={el.description}
					facebookUrl={el.facebookUrl}
					linkedinUrl={el.linkedinUrl}
				/>
			))}
		</>
	);
};

export default Members;
