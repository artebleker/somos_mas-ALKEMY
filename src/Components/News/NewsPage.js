import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewsPage.css';
import ShowTitle from '../../shared/ShowTitle';
// import { getNews } from '../../Services/newService';
import Spinner from '../../shared/Spinner';
import LayoutPublic from '../LayoutPublic/LayoutPublic';
import CustomReactPlayer from '../../shared/VideoPlayer/CustomVideoPlayer';
import NewCard from './NewCard';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsData, newsSelector } from '../../features/news/newSlice';
export default function NewsPage() {
	const dispatch = useDispatch();
	const { news, loading, hasError } = useSelector(newsSelector);

	useEffect(() => {
		dispatch(getNewsData());
	}, []);

	return (
		<LayoutPublic>
			<section className='news'>
				<ShowTitle patchData={{ title: 'Novedades' }} />
				<section className='news__container'>
					{hasError && (
						<p>Ups! Algo salio mal, estamos trabajando en ello 👨‍💻</p>
					)}
					{loading ? (
						<Spinner />
					) : (
						news.map(({ image, created_at: createdAt, name, id }) => (
							<NewCard key={id} newData={{ image, createdAt, name, id }} />
						))
					)}
				</section>

				<section className='news__video'>
					<header>Ultimo evento</header>
					<CustomReactPlayer url='https://www.youtube.com/watch?v=4YnSk1gI_Oo' />
				</section>
			</section>
		</LayoutPublic>
	);
}

NewsPage.propTypes = {
	news: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			createAt: PropTypes.string,
			image: PropTypes.string,
		})
	).isRequired,
};
NewsPage.defaultProps = {
	news: [],
};
