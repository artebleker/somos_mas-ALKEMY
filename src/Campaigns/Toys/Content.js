import React from 'react';
import Countdown from 'react-countdown';
import imgContent1 from '../../assets/contentImages/img-content1.jpg';
import imgContent2 from '../../assets/contentImages/img-content2.jpg';
import imgContent3 from '../../assets/contentImages/img-content3.jpg';
import imgContent4 from '../../assets/contentImages/img-content4.jpg';
import imgContent5 from '../../assets/contentImages/img-content5.jpg';
import './content.css';

const Content = () => {
	const Completionist = () => (
		<span>El tiempo para participar ya ha terminado</span>
	);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <Completionist />;
		} else {
			return (
				<div>
					<p>
						{`Te quedan:
					${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos para
					participar`}
					</p>
				</div>
			);
		}
	};

	const finishDate = new Date('2022-05-10T14:12:00');

	return (
		<div className='content_container'>
			<h2>01-01-1900 13:15 hs Calle 123, Localidad, Provincia</h2>
			<div className='content_container-imgsCountdown'>
				<img className='content_img-left' src={imgContent2} alt='niños' />
				<div className='content_contdown'>
					<Countdown date={finishDate} renderer={renderer} />
				</div>
				<img className='content_img-rigth' src={imgContent4} alt='niños' />
			</div>
			<div className='content_descripcion'>
				<p>
					Particpá en una campaña solidaria de recogida de juguetes cuyo
					objetivo es compartir aquellos con los que más han disfrutado los
					niños para que sigan dando mucho juego. Además, también nos ayudan a
					salvar el medio ambiente porque los juguetes que ya han jugado
					demasiado y no pueden llegar a manos de otros niños, se reciclan.
				</p>
			</div>
			<div className='content_container-imgs'>
				<img src={imgContent3} alt='niños' />
				<img src={imgContent1} alt='niños' />
				<img src={imgContent5} alt='niños' />
			</div>
		</div>
	);
};

export default Content;
