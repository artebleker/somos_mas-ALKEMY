import React, { useState, useEffect } from 'react';
import './carrousel.css';
import { getDataMethod } from '../../Services/publicApiService';
import parser from 'html-react-parser';

const Carrousel = () => {
	const [slides, setSlides] = useState([]);

	const getData = async () => {
		try {
			const data = await getDataMethod(process.env.REACT_APP_SLIDES_ENDPOINT);
			console.log(data.data.data);
			setSlides(data.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const [current, setCurrent] = useState(0);
	const length = slides.length;

	function changeSlide(x) {
		const next = current === length - 1 ? 0 : current + 1;
		const previous = current === 0 ? length - 1 : current - 1;

		setCurrent(x < 0 ? next : previous);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			changeSlide(1);
		}, 5000);
		return () => clearInterval(interval);
	}, [changeSlide]);

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<section className='slider'>
			<div className='left-arrow' onClick={() => changeSlide(1)}>
				&lt;
			</div>
			<div className='right-arrow' onClick={() => changeSlide(-1)}>
				&gt;
			</div>
			{slides.map((slide, index) => {
				return (
					<div key={index}>
						{index === current && (
							<div className='mySlides fade'>
								<h2 className='carrousel-title'>{parser(slide.name)}</h2>
								<div className='carrousel-image-container'>
									<img
										src={slide.image}
										alt='img'
										className='carrousel-image'
									/>
								</div>
								<p className='carrousel-description carrousel-responsive'>
									{parser(
										slide.description !== 'string'
											? slide.description
											: 'Somos más'
									)}
								</p>
							</div>
						)}
					</div>
				);
			})}
		</section>
	);
};

export default Carrousel;
