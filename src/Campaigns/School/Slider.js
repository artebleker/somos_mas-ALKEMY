import './Slider.css';
import React, { useEffect, useRef } from 'react';
import backToSchool from '../../assets/schoolImages/backToSchool.png';
import kidsStydying from '../../assets/schoolImages/kidsStydying.jpg';
import kidPlaying from '../../assets/schoolImages/kidPlaying.jpg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const Slider = () => {
	const sliderShow = useRef(null);
	const intervalSlider = useRef(null);
	const next = () => {
		if (sliderShow.current.children.length > 0) {
			// Obtenemos el primer elemento del sliderShow.
			const firtElement = sliderShow.current.children[0];

			// Establecemos la transicion para el sliderShow.
			sliderShow.current.style.transition = `2000ms ease-out all`;

			const sliderWidth = sliderShow.current.children[0].offsetWidth;

			// Movemos el sliderShow
			sliderShow.current.style.transform = `translateX(-${sliderWidth}px)`;

			const transition = () => {
				// Reiniciamos la posicion del Slideshow.
				sliderShow.current.style.transition = 'none';
				sliderShow.current.style.transform = `translateX(0)`;

				// Tomamos el primer elemento y lo mandamos al final.
				sliderShow.current.appendChild(firtElement);

				sliderShow.current.removeEventListener('transitionend', transition);
			};

			// Eventlistener para cuando termina la animacion.
			sliderShow.current.addEventListener('transitionend', transition);
		}
	};

	const prev = () => {
		if (sliderShow.current.children.length > 0) {
			// Obtenemos el ultimo elemento del sliderShow.
			const index = sliderShow.current.children.length - 1;
			const lastElement = sliderShow.current.children[index];
			sliderShow.current.insertBefore(
				lastElement,
				sliderShow.current.firstChild
			);

			sliderShow.current.style.transition = 'none';
			const sliderWidth = sliderShow.current.children[0].offsetWidth;
			sliderShow.current.style.transform = `translateX(-${sliderWidth}px)`;

			setTimeout(() => {
				sliderShow.current.style.transition = `2000ms ease-out all`;
				sliderShow.current.style.transform = `translateX(0)`;
			}, 30);
		}
	};

	useEffect(() => {
		intervalSlider.current = setInterval(() => {
			next();
		}, 5000);

		sliderShow.current.addEventListener('mouseenter', () => {
			clearInterval(intervalSlider.current);
		});

		sliderShow.current.addEventListener('mouseleave', () => {
			intervalSlider.current = setInterval(() => {
				next();
			}, 5000);
		});
	});

	return (
		<section className='slider-section'>
			<div className='main-slider-container'>
				{/* contendor sliders */}
				<div className='slider-container' ref={sliderShow}>
					{/*  slide 1 */}
					<div className='slide'>
						<img className='sliderImage' src={backToSchool} alt='' />
						<div className='textSlider'>
							<p>Volviendo a la escuela!</p>
						</div>
					</div>

					{/*  slide 2 */}
					<div className='slide'>
						<img className='sliderImage' src={kidsStydying} alt='' />
						<div className='textSlider'>
							<p>Estudiando programacion!</p>
						</div>
					</div>

					{/*  slide 3 */}
					<div className='slide'>
						<img className='sliderImage' src={kidPlaying} alt='' />
						<div className='textSlider'>
							<p>Recreo!</p>
						</div>
					</div>
				</div>

				<div className='sliderControls'>
					<button className='sliderButton sliderLeftButton' onClick={prev}>
						<FaArrowLeft className='arrow-icon-slider' />
					</button>
					<button className='sliderButton sliderRightButton' onClick={next}>
						<FaArrowRight className='arrow-icon-slider' />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Slider;
