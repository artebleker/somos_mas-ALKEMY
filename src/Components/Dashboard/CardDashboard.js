import React from 'react';
import styles from './Dashboard.module.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardDashboard = ({ title, icon, link }) => {
	const history = useHistory();

	CardDashboard.propTypes = {
		title: PropTypes.string,
		icon: PropTypes.object,
		link: PropTypes.string,
	};

	const linked = () => {
		history.push(link);
	};

	return (
		<div className={styles.containerCard}>
			<h3 className={styles.title}>{title}</h3>
			<span className={styles.icon}>{icon}</span>
			<button onClick={linked} className={styles.btn}>
				Ir
			</button>
		</div>
	);
};

export default CardDashboard;
