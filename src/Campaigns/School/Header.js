import React from 'react';
import campaignLogo from '../../assets/campaignImage.png';
import logoImage from '../../assets/LOGO-SOMOS MAS.png';
import BotonRegresar from '../../shared/BotonRegresar';
import './header.css';
const Header = () => {
	return (
		<>
			<header className='campaign__school--header'>
				<img src={campaignLogo} alt='Somos mas - Campaña escolar' />
				<h1>Campaña escolar</h1>
				<img src={logoImage} alt='Somos mas' />
			</header>
			<BotonRegresar />
		</>
	);
};

export default Header;
