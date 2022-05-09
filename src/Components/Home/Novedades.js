import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNewsData, newsSelector } from '../../features/news/newSlice';
import NewCard from '../News/NewCard';
import CustomReactPlayer from '../../shared/VideoPlayer/CustomVideoPlayer';
const Novedades = () => {
	const dispatch = useDispatch();
	const { news } = useSelector(newsSelector);
	useEffect(() => {
		dispatch(getNewsData());
	}, []);
	console.log(news);
	return (
		<section className='home__container home__news'>
			<header className='home_subtitle'>Novedades</header>
			<div className='home__news--cards'>
				{news.slice(0, 7).map(({ image, created_at: createdAt, name, id }) => (
					<NewCard key={id} newData={{ image, createdAt, name, id }} />
				))}
			</div>
			<Link to={'/novedades'} className='btn__primary'>
				Ver mas
			</Link>
			<CustomReactPlayer url='https://www.youtube.com/watch?v=Zp8aZmqf_rU' />
		</section>
	);
};

export default Novedades;
