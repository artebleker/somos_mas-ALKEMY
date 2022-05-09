import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {
	createActivity,
	updateActivity,
} from '../../Services/activitiesService';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';

function ActivitiesForm({ patchData }) {
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
			image: Yup.mixed()
				.required('La imagen es requerida')
				.test('fileType', 'El formato no es correcto', image => {
					if (!SUPPORTED_FORMATS.test(image)) return false;
					setPreviewImage(image);
					return true;
				}),
		}),
		onSubmit: fetchActivities,
	});

	async function fetchActivities(activities) {
		setStatusForm(true);
		const now = new Date().toISOString();
		const endPointForUpdate = `${process.env.REACT_APP_ACTIVITY_END_POINT}/${patchData?.id}`;
		const data = patchData?.id
			? { ...activities, updated_at: now }
			: { ...activities, created_at: now };
		const method = patchData?.id
			? updateActivity(endPointForUpdate, data)
			: createActivity(data);
		try {
			const result = await method;
			console.log(result);
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
					<header>Formulario de actividades</header>
					<div className='input__container'>
						<input
							className='input-field'
							type='text'
							name='name'
							onChange={handleChange}
							value={values.name}
							onBlur={handleBlur}
							placeholder='Activities Title'
						/>
						<span className='input-error'>{touched.name && errors.name}</span>
					</div>
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
					</div>
					<button className='submit-btn' type='submit' disabled={statusForm}>
						{patchData?.id ? 'Update' : 'Send'}
					</button>
				</form>
			</section>
		</HeaderBackoffice>
	);
}

export default ActivitiesForm;

ActivitiesForm.propTypes = {
	patchData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
	}),
};
