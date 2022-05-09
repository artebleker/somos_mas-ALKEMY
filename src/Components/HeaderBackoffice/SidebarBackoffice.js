import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DataSidebarBackoffice } from './DataSidebarBackoffice';
import './SidebarBackoffice.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const SidebarBackoffice = () => {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<div>
			<div className='backoffice_sidebar'>
				<div className='backoffice_menu-bars' onClick={showSidebar}>
					<GiHamburgerMenu />
				</div>
			</div>
			<nav
				className={
					sidebar ? 'backoffice_nav-menu active' : 'backoffice_nav-menu'
				}
			>
				<ul onClick={showSidebar} className='backoffice_nav-menu--items'>
					<li className='backoffice_sidebar-toggle'>
						<div className='backoffice_menu-bars'>
							<AiOutlineClose />
						</div>
					</li>
					<li className='backoffice_sidebar--title'>
						<Link to='/backoffice'>Somos más</Link>
					</li>
					{DataSidebarBackoffice.map((e, i) => {
						return (
							<li key={i} className='backoffice_data--items'>
								<NavLink to={e.link}>
									<span>{e.icon}</span>
									<span>{e.title}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default SidebarBackoffice;
