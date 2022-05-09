import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NewCard.css';
export default function NewCard({ newData }) {
	return (
		<Link to={`/novedades/${newData.id}`} className='news__card'>
			<img src={newData.image} alt='' />
			<span>{new Date(newData.createdAt).toLocaleDateString()}</span>
			<div className='news__card--title'>{newData.name}</div>
		</Link>
	);
}

NewCard.propTypes = {
	newData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
	}),
};
