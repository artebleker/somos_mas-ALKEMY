import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './footer.css';
import {
	TiSocialFacebook,
	TiSocialInstagram,
	TiMail,
	TiPhoneOutline,
	TiSocialTwitter,
	TiSocialLinkedin,
} from 'react-icons/ti';
import { getDataMethod } from '../../Services/publicApiService';
import logoLocal from '../../assets/LOGO-SOMOS MAS.png';

const Footer = () => {
	const [data, setData] = useState([]);

	const getData = async () => {
		const info = await getDataMethod('organization');

		setData(info.data.data);
	};
	useEffect(() => {
		getData();
	}, []);

	const links = [
		{ text: 'INICIO', link: '/' },
		{ text: 'NOSOTROS', link: '/nosotros' },
		{ text: 'CONTACTO', link: '/contact' },
	];
	const linksCampaigns = [
		{ text: 'Campaña en Escuela', link: '/school-campaign' },
		{ text: 'Campaña de Juguetes', link: '/toys-campaign' },
	];

	const socialMedia = [
		{
			img: <TiMail />,
			text: 'E-mail',
			link: 'mailto:somosfundacionmas@gmail.com',
		},
		{
			img: <TiSocialInstagram />,
			text: 'Instagram',
			link: data.instagram_url || 'https://www.instagram.com/SomosMás/',
		},
		{
			img: <TiSocialFacebook />,
			text: 'Facebook',
			link: data.facebook_url || 'https://www.facebook.com/Somos_Más',
		},
		{
			img: <TiSocialTwitter />,
			text: 'Twitter',
			link: data.twitter_url || 'https://www.twitter.com/Somos_Más',
		},
		{
			img: <TiSocialLinkedin />,
			text: 'LinkedIn',
			link: data.linkedin_url || 'https://www.linkedin.com/Somos_Más',
		},
		{
			img: <TiPhoneOutline />,
			text: 'Telefono',
			link: `tel:${data.phone}` || 'tel:1160112988',
		},
	];

	return (
		<footer className='footer-public-school'>
			<nav className='nav-footer-school'>
				<Link className='nav-footer-logo-school' to='/'>
					<img
						src={logoLocal || data.logo}
						alt={data.name}
						title={data.name}
					></img>
				</Link>

				<ul className='nav-footer-links-school'>
					{links.map((li, index) => {
						return (
							<li
								key={`${li.text}${index}footer`}
								className='footer-link-school'
							>
								<NavLink to={li.link}>{li.text}</NavLink>
							</li>
						);
					})}
				</ul>
				<ul id='links__campaigns-school' className=' nav-footer-links-school'>
					{linksCampaigns.map((li, index) => {
						return (
							<li
								key={`${li.text}${index}footer`}
								className='footer-link-school'
							>
								<NavLink
									className={({ isActive }) =>
										isActive ? 'link__active-school' : ''
									}
									to={li.link}
								>
									{li.text}
								</NavLink>
							</li>
						);
					})}
				</ul>

				<ul className='nav-footer-socialMedia-school'>
					{socialMedia.map((li, index) => {
						return (
							<li
								key={`${li.text}${index}`}
								className='footer-socialMedia-school'
							>
								<a
									href={li.link}
									title={li.text}
									target='_blank'
									rel='noreferrer'
								>
									{li.img}
									<p className='socialMedia-text-school'>{li.text}</p>
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
			<span className='footer-address-school'>{data.address}</span>
		</footer>
	);
};

export default Footer;
