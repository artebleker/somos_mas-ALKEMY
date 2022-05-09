import React from 'react';
import './MemberList.css';
import { AiFillLinkedin, AiFillFacebook } from 'react-icons/ai';
const MemberList = prop => {
	const { name, image, description, facebookUrl, linkedinUrl } = prop;
	return (
		<div className='memberlist_container'>
			<img src={image} alt={name} />
			<div>
				<h1>{name}</h1>
				<div
					className='memberlist_description'
					dangerouslySetInnerHTML={{ __html: `<p>${description}</p>` }}
				></div>
			</div>
			<div>
				<ul>
					<li>
						<AiFillFacebook style={{ color: '#214763', fontSize: '1.3rem' }} />{' '}
						{facebookUrl}
					</li>
					<li>
						<AiFillLinkedin style={{ color: '#214763', fontSize: '1.3rem' }} />{' '}
						{linkedinUrl}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MemberList;
