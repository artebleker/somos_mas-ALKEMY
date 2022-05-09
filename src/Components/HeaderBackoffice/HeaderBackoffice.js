import React from 'react';
import SidebarBackoffice from './SidebarBackoffice';
import PropTypes from 'prop-types';

const HeaderBackoffice = ({ children }) => {
	return (
		<div className='backoffice_header'>
			<SidebarBackoffice />
			<div>{children}</div>
		</div>
	);
};

export default HeaderBackoffice;

HeaderBackoffice.propTypes = {
	children: PropTypes.any,
};
