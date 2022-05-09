import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ShowTitle = ({ patchData }) => {
	const [previewImage, setPreviewImage] = useState(patchData?.image || null);

	useEffect(() => {
		if (patchData?.image) {
			setPreviewImage(patchData?.image);
		}
	}, [previewImage]);

	return (
		<>
			<h1 style={{ fontFamily: 'Englebert' }}>{patchData.title}</h1>
			{patchData?.image && (
				<img
					src={previewImage}
					alt='preview'
					width={100}
					height={100}
					style={{ objectFit: 'cover' }}
				/>
			)}
		</>
	);
};

export default ShowTitle;

ShowTitle.propTypes = {
	patchData: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image: PropTypes.string,
	}),
};
