import React from 'react';
import campaignLogo from '../../assets/toysCampaign.png';
import logoImage from '../../assets/LOGO-SOMOS MAS.png';
import './header.css';
import BotonRegresar from '../../shared/BotonRegresar';
const Header = () => {
	return (
		<>
			<header className='campaign__toys--header'>
				<img src={campaignLogo} alt='Somos mas - Campaña escolar' />
				<h1>Campaña de juguetes</h1>
				<img src={logoImage} alt='Somos mas' />
			</header>
			<BotonRegresar />
		</>
	);
};

export default Header;
