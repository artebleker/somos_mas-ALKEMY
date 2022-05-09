import React from 'react';
import PropTypes from 'prop-types';

const RenderHTML = ({ textHTML }) => {
	function createMarkup() {
		return { __html: textHTML };
	}
	return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default RenderHTML;

RenderHTML.propTypes = {
	textHTML: PropTypes.string,
};
