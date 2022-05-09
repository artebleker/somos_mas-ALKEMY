import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';

function UserForm({ patchData }) {
	const [previewImage, setPreviewImage] = useState(
		patchData?.profilePhoto || null
	);
	console.log(patchData);
	const [previewRole, setPreviewRole] = useState(patchData?.role || null);
	const [statusForm, setStatusForm] = useState(false);
	const SUPPORTED_FORMATS = /(jpg|png)/;
	const ROLE_ACCESS_FORMATS = /(USER|ADMIN)/;
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
			email: patchData?.email || '',
			role: patchData?.role || '',
			profilePhoto: patchData?.profilePhoto || '',
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.required('El nombre es un campo requerido')
				.min(4, 'El nombre deberia contenter mas de 4 caracteres'),
			email: Yup.string()
				.required('El email es un campo requerido')
				.email('El email no es válido'),
			role: Yup.string()
				.required('El role es un campo requerido')
				.test('role', 'El rol no está autorizado', role => {
					if (!ROLE_ACCESS_FORMATS.test(role)) return false;
					setPreviewRole(role);
					return true;
				}),
			profilePhoto: Yup.mixed()
				.required('La imagen es requerida')
				.test('fileType', 'El formato no es correcto', image => {
					if (!SUPPORTED_FORMATS.test(image)) return false;
					setPreviewImage(image);
					return true;
				}),
		}),
		onSubmit: fetchUsers,
	});

	async function fetchUsers(user) {
		setStatusForm(true);
		const now = new Date().toISOString();
		const method = patchData?.id ? 'PATCH' : 'POST';
		const id = patchData?.id ? `/${patchData.id}` : '';
		const url = `https://ongapi.alkemy.org/api/users${id}`;
		const data = patchData?.id
			? { ...user, updated_at: now }
			: { ...user, created_at: now };
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
		<HeaderBackoffice>
			<section className='form__section form__backoffice'>
				<form className='form-container' onSubmit={handleSubmit}>
					<header>Formulario de usuarios</header>
					<div className='input__container'>
						<input
							className='input-field'
							type='text'
							name='name'
							onChange={handleChange}
							value={values.name}
							onBlur={handleBlur}
							placeholder='Nombre'
						/>
						<span className='input-error'>{touched.name && errors.name}</span>
					</div>

					<div className='input__container'>
						<input
							className='input-field'
							type='text'
							name='email'
							onChange={handleChange}
							value={values.email}
							onBlur={handleBlur}
							placeholder='Email'
						/>
						<span className='input-error'>{touched.email && errors.email}</span>
					</div>

					<div className='input__container'>
						<select
							className='input-field'
							value={values.role}
							onChange={e =>
								setPreviewRole({ ...previewRole, role: e.target.value })
							}
						>
							<option value='' disabled>
								Select the role
							</option>
							<option value='1'>USER</option>
							<option value='2'>ADMIN</option>
						</select>
						<span className='input-error'>{touched.role && errors.role}</span>
					</div>

					<div className='input__container'>
						<label className='input-file'>
							Imagen de Perfil
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
						<span className='input-error'>
							{touched.profilePhoto && errors.profilePhoto}
						</span>
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

export default UserForm;

UserForm.propTypes = {
	patchData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		email: PropTypes.string,
		role: PropTypes.string,
		profilePhoto: PropTypes.string,
	}),
};
