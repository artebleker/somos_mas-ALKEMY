import React from 'react';
import { MdComputer } from 'react-icons/md';
import { BsListOl, BsListUl, BsImages } from 'react-icons/bs';
import { GiConversation } from 'react-icons/gi';
import { FaUserFriends, FaUsers } from 'react-icons/fa';
import { RiOrganizationChart } from 'react-icons/ri';

export const DataSidebarBackoffice = [
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
