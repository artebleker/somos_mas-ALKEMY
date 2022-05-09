import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {
	createTestimonial,
	updateTestimonial,
} from '../../Services/testimonialService';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
/**
 *  Testimonial Form
 * @param {Object} props
 * @param {Object} [props.patchData] testimonial data
 * @param {number} props.patchData.id testimonial id
 * @param {string} props.patchData.name testimonial name
 * @param {string} props.patchData.image testimonial image
 * @param {string} props.patchData.description testimonial description
 */
function TestimonialForm({ patchData }) {
	const [previewImage, setPreviewImage] = useState(patchData?.image || null);
	const [statusForm, setStatusForm] = useState(false);
	const SUPPORTED_FORMATS = /(jpg|png)/;
	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		setFieldTouched,
		touched,
		setFieldValue,
	} = useFormik({
		initialValues: {
			name: patchData?.name || '',
			description: patchData?.description || '',
			image: patchData?.image || '',
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.required('El nombre es un campo requerido')
				.min(4, 'El nombre deberia contenter mas de 4 caracteres'),
			description: Yup.string().required(
				'La description es un campo requerido'
			),
			image: Yup.mixed()
				.required('La imagen es requerida')
				.test('fileType', 'El formato no es correcto', image => {
					if (!SUPPORTED_FORMATS.test(image)) return false;
					setPreviewImage(image);
					return true;
				}),
		}),
		onSubmit: fetchTestimonial,
	});
	async function fetchTestimonial(testimonial) {
		setStatusForm(true);
		const now = new Date().toISOString();
		const data = patchData?.id
			? { ...testimonial, updated_at: now }
			: { ...testimonial, created_at: now };
		const method = patchData?.id
			? updateTestimonial(patchData.id, data)
			: createTestimonial(data);
		try {
			const result = await method;
			console.log(result.data);
		} catch (error) {
			console.error(error);
		} finally {
			setStatusForm(false);
		}
	}
	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	return (
		<HeaderBackoffice>
			<section className='form__section form__backoffice'>
				<form className='form-container' onSubmit={handleSubmit}>
					<header>Formulario de testimonios</header>
					<div className='input__container'>
						<input
							className='input-field'
							type='text'
							name='name'
							onChange={handleChange}
							value={values.name}
							onBlur={handleBlur}
							placeholder='Testimonial Title'
						/>
					</div>
					<span className='input-error'>{touched.name && errors.name}</span>
					<div className='input__container'>
						<CKEditor
							data={values.description}
							editor={ClassicEditor}
							onBlur={() => setFieldTouched('description', true)}
							onChange={(_, editor) => {
								const data = editor.getData();
								setFieldValue('description', data);
							}}
						/>
					</div>
					<span className='input-error'>
						{touched.description && errors.description}
					</span>
					<div className='input__container'>
						<label className='input-file'>
							Subir imagen
							<input
								type='file'
								accept='image/png, image/jpeg'
								onChange={async event => {
									setFieldTouched('image', true);
									const imageBase64 = await getBase64(event.target.files[0]);
									setFieldValue('image', imageBase64);
								}}
							/>
						</label>
					</div>
					<span className='input-error'>{touched.image && errors.image}</span>
					{previewImage && (
						<img
							src={previewImage}
							alt='preview'
							width={100}
							height={100}
							style={{ objectFit: 'cover' }}
						/>
					)}
					<button className='submit-btn' type='submit' disabled={statusForm}>
						{patchData?.id ? 'Update' : 'Send'}
					</button>
				</form>
			</section>
		</HeaderBackoffice>
	);
}

export default TestimonialForm;

TestimonialForm.propTypes = {
	patchData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
	}),
};
