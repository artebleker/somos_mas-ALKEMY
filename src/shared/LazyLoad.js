import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';

/**
 * @param {string} src fuente url de la imagen
 * @param {string} alt texto alternativo a la imagen
 * @param {number} width width opcional
 * @param {number} height heigth opcional
 */

const LazyLoad = ({ alt, height, src, width }) => {
	return (
		<div>
			<LazyLoadImage src={src} alt={alt} height={height} width={width} />
		</div>
	);
};

export default LazyLoad;

LazyLoad.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	height: PropTypes.number,
	width: PropTypes.number,
};
