import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './footerPublic.css';
import {
	TiSocialFacebook,
	TiSocialInstagram,
	TiMail,
	TiPhoneOutline,
	TiSocialTwitter,
	TiSocialLinkedin,
} from 'react-icons/ti';
import { getDataMethod } from '../../../Services/publicApiService';
import logo from '../../../assets/LOGO-SOMOS MAS.png';

const FooterPublic = () => {
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const info = await getDataMethod(
				process.env.REACT_APP_ORGANIZATION_ENDPOINT
			);
			setData(info.data.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	const links = [
		{ text: 'Inicio', link: '/' },
		{ text: 'Campaña en Escuela', link: '/school-campaign' },
		{ text: 'Nosotros', link: '/nosotros' },
		{ text: 'Campaña de Juguetes', link: '/toys-campaign' },
		{ text: 'Contacto', link: '/contact' },
	];
	const socialMedia = [
		{
			img: <TiMail />,
			text: 'mail',
			link: 'mailto:somosfundacionmas@gmail.com',
		},
		{
			img: <TiSocialInstagram />,
			text: 'instagram',
			link: data.instagram_url || 'https://www.instagram.com/SomosMás/',
		},
		{
			img: <TiSocialFacebook />,
			text: 'facebook',
			link: data.facebook_url || 'https://www.facebook.com/Somos_Más',
		},
		{
			img: <TiSocialTwitter />,
			text: 'twitter',
			link: data.twitter_url || 'https://www.twitter.com/Somos_Más',
		},
		{
			img: <TiSocialLinkedin />,
			text: 'linkedin',
			link: data.linkedin_url || 'https://www.linkedin.com/Somos_Más',
		},
		{
			img: <TiPhoneOutline />,
			text: 'telefono',
			link: `tel:${data.phone}` || 'tel:1160112988',
		},
	];

	return (
		<footer className='footer-public'>
			<nav className='nav-footer'>
				<Link to='/'>
					<img
						className='nav-footer-logo'
						src={logo}
						alt={data.name}
						title={data.name}
					></img>
				</Link>
				<ul className='nav-footer-links'>
					{links.map((li, index) => {
						return (
							<li key={`${li.text}${index}footer`} className='footer-link'>
								<NavLink to={li.link}>{li.text}</NavLink>
							</li>
						);
					})}
				</ul>

				<ul className='nav-footer-socialMedia'>
					{socialMedia.map((li, index) => {
						return (
							<li key={`${li.text}${index}`} className='footer-socialMedia'>
								<a
									href={li.link}
									title={li.text}
									target='_blank'
									rel='noreferrer'
								>
									{li.img}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
			<span className='footer-address'>{data.address}</span>
		</footer>
	);
};

export default FooterPublic;
