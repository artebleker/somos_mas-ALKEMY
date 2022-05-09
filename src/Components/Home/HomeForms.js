import React, { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import axios from 'axios';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';

const HomeForms = () => {
	const [image, setImage] = useState('');
	const [image2, setImage2] = useState('');
	const [image3, setImage3] = useState('');

	const toBase64 = archivos => {
		Array.from(archivos).forEach(archivo => {
			const reader = new FileReader();
			reader.readAsDataURL(archivo);
			reader.onload = function () {
				const base64 = reader.result;

				setImage(base64);
				setImage2(base64);
				setImage3(base64);
			};
		});
	};
	return (
		<HeaderBackoffice>
			<section className='form__section form__backoffice'>
				<Formik
					initialValues={{
						textWelcome: '',
						textSlide: '',
						slideImage: '',
						textSlide2: '',
						slideImage2: '',
						textSlide3: '',
						slideImage3: '',
					}}
					validate={valores => {
						const errors = {};
						if (valores.textWelcome.length > 20) {
							errors.textWelcome =
								'El texto de bienvenida no puede contener más de 20 caracteres';
						}

						return errors;
					}}
					onSubmit={(
						{ textSlide, textSlide2, textSlide3, textWelcome },
						{ resetForm }
					) => {
						resetForm();
						console.log({ textSlide, image });
						console.log(textWelcome);

						const welcomeText = async () => {
							try {
								await axios.put(`https://ongapi.alkemy.org/api/organization`, {
									welcome_text: textWelcome,
								});
							} catch (err) {
								console.log(err);
							}
						};
						const slideOne = async () => {
							try {
								await axios.put(`https://ongapi.alkemy.org/api/slides/1126`, {
									name: textSlide,
									image: image,
								});
							} catch (err) {
								console.log(err);
							}
						};
						const slideTwo = async () => {
							try {
								await axios.put(`https://ongapi.alkemy.org/api/slides/1127`, {
									name: textSlide2,
									image: image2,
								});
							} catch (err) {
								console.log(err);
							}
						};
						const slideThree = async () => {
							try {
								await axios.put(`https://ongapi.alkemy.org/api/slides/1129`, {
									name: textSlide3,
									image: image3,
								});
							} catch (err) {
								console.log(err);
							}
						};
						if (textWelcome) {
							welcomeText();
						}

						if (textSlide) {
							slideOne();
						}
						if (textSlide2) {
							slideTwo();
						}
						if (textSlide3) {
							slideThree();
						}
					}}
				>
					{({ values, errors, handleSubmit, handleChange, handleBlur }) => (
						<form className='form-container' onSubmit={handleSubmit}>
							<h3>Texto de bienvenida</h3>
							<input
								className='input-field'
								type='text'
								name='textWelcome'
								value={values.textWelcome}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='textWelcome'
							/>
							<ErrorMessage
								name='textWelcome'
								component={() => <p>{errors.textWelcome}</p>}
							/>
							<h3>Slide numero 1</h3>
							<input
								className='input-field'
								type='text'
								name='textSlide'
								value={values.textSlide}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='textSlide'
							/>

							<input
								className='input-field'
								type='file'
								id='slideImage'
								name='slideImage'
								onChange={e => toBase64(e.target.files)}
								placeholder='Write some slideImage'
							/>

							<h3>Slide numero 2</h3>
							<input
								className='input-field'
								type='text'
								name='textSlide2'
								value={values.textSlide2}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='textSlide2'
							/>

							<input
								className='input-field'
								type='file'
								id='slideImage2'
								name='slideImage2'
								onChange={e => toBase64(e.target.files)}
								placeholder='Write some slideImage2'
							/>

							<h3>Slide numero 3</h3>
							<input
								className='input-field'
								type='text'
								name='textSlide3'
								value={values.textSlide3}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='textSlide3'
							/>

							<input
								className='input-field'
								type='file'
								id='slideImage3'
								name='slideImage3'
								onChange={e => toBase64(e.target.files)}
								placeholder='Write some slideImage3'
							/>
							{image && (
								<img
									src={image}
									alt='No se pudo mostrar la imagen'
									style={{ width: '300px' }}
								/>
							)}
							<button className='submit-btn' type='submit'>
								Send
							</button>
						</form>
					)}
				</Formik>
			</section>
		</HeaderBackoffice>
	);
};

export default HomeForms;
