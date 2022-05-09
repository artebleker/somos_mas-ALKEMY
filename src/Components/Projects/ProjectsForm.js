import axios from 'axios';
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';

function ProjectsForm({ patchData }) {
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
			due_date: patchData?.due_date || '',
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
		onSubmit: fetchProjects,
	});

	async function fetchProjects(projects) {
		setStatusForm(true);
		const now = new Date().toISOString();
		const method = patchData?.id ? 'PATCH' : 'POST';
		const id = patchData?.id ? `/${patchData.id}` : '';
		const url = `https://ongapi.alkemy.org/api/projects${id}`;
		const data = patchData?.id
			? { ...projects, updated_at: now }
			: { ...projects, created_at: now };
		try {
			const result = await axios({ method, url, data });
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
		<div>
			<HeaderBackoffice>
				<form className='form-container' onSubmit={handleSubmit}>
					<input
						className='input-field'
						type='text'
						name='name'
						onChange={handleChange}
						value={values.name}
						onBlur={handleBlur}
						placeholder='Projects Title'
					/>
					<span className='input-error'>{touched.name && errors.name}</span>

					<CKEditor
						data={values.description}
						editor={ClassicEditor}
						onBlur={() => setFieldTouched('description', true)}
						onChange={(_, editor) => {
							const data = editor.getData();
							setFieldValue('description', data);
						}}
					/>
					<span className='input-error'>
						{touched.description && errors.description}
					</span>
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
					<input
						className='input-field'
						type='date'
						name='due_data'
						onChange={e => setFieldValue('due_date', e.target.value)}
						value={values.due_date}
						min='2022-01-01'
						max='2099-01-01'
					/>
					<button className='submit-btn' type='submit' disabled={statusForm}>
						{patchData?.id ? 'Update' : 'Send'}
					</button>
				</form>
			</HeaderBackoffice>
		</div>
	);
}

export default ProjectsForm;

ProjectsForm.propTypes = {
	patchData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
		due_date: PropTypes.string,
	}),
};
