import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import '../FormStyles.css';
// import { createSlide, updateSlide } from '../../Services/slidesService';
import axios from 'axios';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
const SlidesForm = props => {
	const { patchData } = props;
	const [previewImage, setPreviewImage] = useState('');

	const slideSchema = yup.object().shape({
		image: yup.string().required('Se requiere una imagen'),
		name: yup
			.string()
			.min(4, 'El nombre debe contener más de 4 caracteres')
			.required('Se requiere nombre'),
		order: yup.number().required(),
		description: yup.string().required('Se requiere una descripción'),
	});

	const handleSubmit = (values, setSubmitting) => {
		const now = new Date().toISOString();
		const method = patchData ? 'patch' : 'post';
		const id = patchData && patchData.id;
		const url = patchData
			? `${process.env.REACT_APP_SLIDES_ENDPOINT}/${id}`
			: process.env.REACT_APP_SLIDES_ENDPOINT;
		const data = patchData
			? { ...values, updated_at: now }
			: { ...values, created_at: now };
		axios({ method, url, data })
			.then(res => console.log(res))
			.catch(err => console.log(err));
		setSubmitting(false);
	};

	return (
		<HeaderBackoffice>
			<section className='form__section form__backoffice'>
				<Formik
					initialValues={{
						image: patchData ? patchData.image : '',
						name: patchData ? patchData.name : '',
						order: patchData ? patchData.order : 0,
						description: patchData ? patchData.description : '',
					}}
					onSubmit={(values, { setSubmitting }) =>
						handleSubmit(values, setSubmitting)
					}
					validationSchema={slideSchema}
				>
					{({ isSubmitting, setFieldValue }) => (
						<Form className='form-container'>
							<header>Formulario de slides</header>
							{previewImage && (
								<img className='preview-img' src={previewImage} alt='Slide' />
							)}
							<input
								className='input-field input__container'
								type='file'
								name='image'
								onChange={e => {
									const reader = new FileReader();
									const file = e.target.files[0];
									reader.onload = () => {
										setFieldValue('image', reader.result);
										setPreviewImage(reader.result);
									};
									reader.readAsDataURL(file);
								}}
								accept='image/png, image/jpeg'
								required
							></input>
							<ErrorMessage
								className='input-error'
								name='image'
								component='div'
							/>
							<div className='input__container'>
								<Field
									className='input-field'
									type='text'
									name='name'
									placeholder='Slide Title'
									required
								/>
							</div>
							<ErrorMessage
								className='input-error'
								name='name'
								component='div'
							/>
							<div className='input__container'>
								<Field
									className='input-field'
									type='number'
									name='order'
									placeholder='Slide Order'
									required
								/>
							</div>
							<ErrorMessage
								className='input-error'
								name='order'
								component='div'
							/>
							<div className='input__container'>
								<CKEditor
									editor={ClassicEditor}
									onChange={(event, editor) => {
										setFieldValue('description', editor.getData());
									}}
								/>
							</div>
							<ErrorMessage
								className='input-error'
								name='description'
								component='div'
							/>
							<button
								className='submit-btn'
								type='submit'
								disabled={isSubmitting}
							>
								Send
							</button>
						</Form>
					)}
				</Formik>
			</section>
		</HeaderBackoffice>
	);
};

export default SlidesForm;

SlidesForm.propTypes = {
	patchData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		order: PropTypes.number.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
	}),
};
