import React, { useState, useEffect } from 'react';
import '../../Components/FormStyles.css';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
import {
	privatePutRequest,
	privatePostRequest,
} from '../../Services/privateApiService';
import showAlert from '../../shared/showAlert';
import { useHistory } from 'react-router-dom';

/**
 *  news Form
 * @param {Object} props
 * @param {Object} [props.patchData] news data
 * @param {number} props.patchData.id news id
 * @param {string} props.patchData.name news name
 * @param {string} props.patchData.content news description
 * @param {string} props.patchData.image news image
 * @param {number} props.patchData.category_id news image
 *
 */

const NewsForm = ({ news }) => {
	const [categories, setCategories] = useState([]);
	const [previewImage, setPreviewImage] = useState(() => news?.image || null);
	const [statusForm, setStatusForm] = useState(false);
	const history = useHistory();

	const SUPPORTED_FORMATS = /(jpg|png|jpeg)/;
	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	const getCategory = async () => {
		const url = 'https://ongapi.alkemy.org/api/categories';

		try {
			const res = await axios.get(url);
			res.data.data.forEach(element => {
				const category = {
					id: element.id,
					name: element.name,
				};

				setCategories(categories => [...categories, category]);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	const validacionShema = Yup.object().shape({
		name: Yup.string()
			.required('El titulo es requerido')
			.min(4, 'El titulo debe tener minimo 4 caracteres'),
		content: Yup.string().required('El contenido es requerido'),
		image: Yup.mixed()
			.required('La imagen es requerida')
			.test('fileType', 'El formato no es correcto', image => {
				if (!SUPPORTED_FORMATS.test(image)) return false;
				setPreviewImage(image);
				return true;
			}),
		category_id: Yup.number().required('La categoria es requerida'),
	});

	return (
		<div>
			<HeaderBackoffice>
				<Formik
					initialValues={{
						name: news?.name || '',
						content: news?.content || '',
						image: news?.image || '',
						category_id: news?.category_id || '',
					}}
					validationSchema={validacionShema}
					onSubmit={async ({ image, ...newsFormData }) => {
						setStatusForm(true);
						const isUrlImage = image.includes('http' || 'https');
						try {
							if (news?.id) {
								const putRes = await privatePutRequest({
									url: `news/${news.id}`,
									putData: isUrlImage
										? { ...newsFormData }
										: { ...newsFormData, image },
								});
								console.log(putRes);
								if (!putRes.data.success)
									throw new Error('error while editing');
								showAlert({ type: 'success', title: 'Editado correctamente' });
								history.push('/backoffice/news');
								return;
							}
							const postRes = await privatePostRequest('news', {
								...newsFormData,
								image,
							});
							if (!postRes.success) throw new Error('error while posting');
							showAlert({ type: 'success', title: 'Creado correctamente' });
							history.push('/backoffice/news');
						} catch (err) {
							console.log(err);
							showAlert({ type: 'error', message: 'Ocurrio un error' });
						} finally {
							setStatusForm(false);
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						setFieldTouched,
					}) => (
						<section className='form__section form__backoffice'>
							<form className='form-container' onSubmit={handleSubmit}>
								<header>Formulario de novedades</header>
								<div className='input__container'>
									<label htmlFor='titulo'>Titulo</label>
									<input
										data-testid='titulo'
										className='input-field'
										type='text'
										name='name'
										id='titulo'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										placeholder='Titulo'
									/>
									<span className='error-message-form'>
										{touched.name && errors.name}
									</span>
								</div>
								<div className='input__container'>
									<label>Contenido</label>
									<CKEditor
										className='news__ckeditor'
										data-testid='content'
										editor={ClassicEditor}
										data={values.content}
										onBlur={() => setFieldTouched('content', true)}
										onChange={(event, editor) => {
											const data = editor.getData();
											setFieldValue('content', data);
										}}
									/>
									<span className='error-message-form'>
										{touched.content && errors.content}
									</span>
								</div>
								<div className='input__container'>
									<label className='input-file'>
										Subir imagen
										<input
											data-testid='image'
											type='file'
											accept='image/png, image/jpeg'
											onChange={async event => {
												setFieldTouched('image', true);
												const imageBase64 = await getBase64(
													event.target.files[0]
												);
												setFieldValue('image', imageBase64);
											}}
										/>
									</label>
									<span className='error-message-form'>
										{touched.image && errors.image}
									</span>
								</div>
								{previewImage && (
									<img
										src={previewImage}
										alt={news?.name || 'preview'}
										width={100}
										height={100}
										style={{ objectFit: 'cover' }}
									/>
								)}
								<div className='input__container'>
									<label htmlFor='category_id'>Categoria</label>
									<select
										className='select-field'
										name='category_id'
										data-testid='categoria'
										value={values.category_id || ''}
										onChange={handleChange}
									>
										<option value='' disabled>
											Selecciona categoria
										</option>
										{categories.map((el, index) => (
											<option key={index} value={el.id}>
												{el.name}
											</option>
										))}
									</select>
									<span className='error-message-form'>
										{touched.category_id && errors.category_id}
									</span>
								</div>

								<button
									className='submit-btn'
									type='submit'
									disabled={statusForm}
								>
									{news?.id ? 'Update' : 'Send'}
								</button>
							</form>
						</section>
					)}
				</Formik>
			</HeaderBackoffice>
		</div>
	);
};

export default NewsForm;

NewsForm.propTypes = {
	news: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		content: PropTypes.string,
		image: PropTypes.string,
		category_id: PropTypes.number,
	}),
};
