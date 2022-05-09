import React from 'react';
import CardDashboard from './CardDashboard';
import styles from './Dashboard.module.css';
import { MdComputer } from 'react-icons/md';
import { BsListOl, BsListUl, BsImages } from 'react-icons/bs';
import { GiConversation } from 'react-icons/gi';
import { FaUserFriends, FaUsers } from 'react-icons/fa';
import { RiOrganizationChart } from 'react-icons/ri';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';

const Dashboard = () => {
	const cards = [
		{
			icon: <MdComputer />,
			title: 'Novedades',
			link: '/backoffice/news',
		},
		{
			icon: <BsListOl />,
			title: 'Actividades',
			link: '/backoffice/activities',
		},
		{
			icon: <BsListUl />,
			title: 'Categorias',
			link: '/backoffice/create-category',
		},
		{
			icon: <GiConversation />,
			title: 'Testimonios',
			link: '/backoffice/create-testimonials',
		},
		{
			icon: <RiOrganizationChart />,
			title: 'Organización',
			link: '/backoffice/organization',
		},
		{
			icon: <BsImages />,
			title: 'Slides',
			link: '/backoffice/slides',
		},
		{
			icon: <FaUserFriends />,
			title: 'Usuarios',
			link: '/backoffice/users',
		},
		{
			icon: <FaUsers />,
			title: 'Miembros',
			link: '/backoffice/create-member',
		},
	];

	return (
		<HeaderBackoffice>
			<div className={styles.containerDashboard}>
				{cards.map(e => {
					return (
						<CardDashboard
							key={e.title}
							icon={e.icon}
							title={e.title}
							link={e.link}
						/>
					);
				})}
			</div>
		</HeaderBackoffice>
	);
};

export default Dashboard;
