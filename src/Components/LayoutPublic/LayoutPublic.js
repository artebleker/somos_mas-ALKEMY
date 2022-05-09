import React from 'react';
import HeaderPublic from './HeaderPublic/HeaderPublic';
import FooterPublic from './FooterPublic/FooterPublic';
import PropTypes from 'prop-types';
const LayoutPublic = ({ children }) => {
	return (
		<>
			<HeaderPublic />
			<main>
                {children}
            </main>
			<FooterPublic />
		</>
	);
};

export default LayoutPublic;

LayoutPublic.propTypes = {
	children: PropTypes.any,
};
