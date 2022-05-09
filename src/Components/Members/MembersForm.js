import '../FormStyles.css';
import React from 'react';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import axios from 'axios';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';
import showAlert from '../../shared/showAlert';

/**
 *  member Form
 * @param {Object} props
 * @param {Object} [props.member] member data
 * @param {number} props.member.id member id
 * @param {string} props.member.name member name
 * @param {string} props.member.image member image
 * @param {string} props.member.description member description
 * @param {string} props.member.facebookUrl member image
 * @param {string} props.member.linkedinUrl member description
 */

const MembersForm = ({ member }) => {
	const SUPPORTED_FORMATS = /(jpg|png)/;
	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	const validacionShema = Yup.object().shape({
		name: Yup.string()
			.required('El titulo es requerido')
			.min(4, 'El titulo debe tener minimo 4 caracteres'),
		description: Yup.string().required('La descripcion es requerida'),
		image: Yup.mixed()
			.required('La imagen es requerida')
			.test('fileType', 'El formato no es correcto', image => {
				if (!SUPPORTED_FORMATS.test(image)) return false;
				return true;
			}),
		facebookUrl: Yup.string()
			.required('El campo Facebook es requerido')
			.url('La url invalida'),
		linkedinUrl: Yup.string()
			.required('El campo linkedin es requerido')
			.url('La url invalida'),
	});

	return (
		<HeaderBackoffice>
			<section className='form__section form__backoffice'>
				<Formik
					initialValues={{
						name: member?.name || '',
						image: member?.image || '',
						description: member?.description || '',
						facebookUrl: member?.facebookUrl || '',
						linkedinUrl: member?.linkedinUrl || '',
					}}
					validationSchema={validacionShema}
					onSubmit={async member => {
						console.log(member);
						const date = new Date().toISOString();
						const method = member?.id ? 'PATCH' : 'POST';
						const id = member?.id ? `/${member.id}` : '';
						const url = member?.id
							? `https://ongapi.alkemy.org/api/members${id}`
							: 'https://ongapi.alkemy.org/api/members';
						const data = member?.id
							? { ...member, updated_at: date }
							: { ...member, created_at: date };
						try {
							const res = await axios(
								{ method, url, data },
								{
									headers: { 'Content-Type': 'application/json' },
								}
							);
							console.log(res);
							showAlert({ type: 'success', title: 'Miembro creado con exito' });
						} catch (err) {
							console.log('Error', err);
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
					}) => (
						<form className='form-container' onSubmit={handleSubmit}>
							<header>Formulario de miembros</header>
							<div className='input__container'>
								<label htmlFor='name'>Nombre</label>
								<input
									className='input-field'
									type='text'
									name='name'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									placeholder='Titulo'
								/>
							</div>
							<span>{touched.name && errors.name}</span>
							<div className='input__container'>
								<label className='input-file'>
									Subir imagen
									<input
										data-testid='image'
										type='file'
										name='image'
										accept='image/png, image/jpeg'
										onChange={async e => {
											const imageBase64 = await getBase64(e.target.files[0]);
											setFieldValue('image', imageBase64);
										}}
									/>
								</label>
							</div>
							<span>{touched.image && errors.image}</span>
							<div className='input__container'>
								<label htmlFor='description'>Description</label>
								<CKEditor
									className='input-field'
									editor={ClassicEditor}
									data={values.description}
									onReady={editor => {
										console.log('El editor esta listo', editor);
									}}
									onChange={(event, editor) => {
										const data = editor.getData();
										setFieldValue('description', data);
									}}
								/>
							</div>
							<span>{touched.description && errors.description}</span>
							<div className='input__container'>
								<label htmlFor='facebookUrl'>Facebook</label>
								<input
									className='input-field'
									type='text'
									name='facebookUrl'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.facebookUrl}
									placeholder='Facebook'
								/>
							</div>
							<span>{touched.facebookUrl && errors.facebookUrl}</span>
							<div className='input__container'>
								<label htmlFor='facebookUrl'>Linkedin</label>
								<input
									className='input-field'
									type='text'
									name='linkedinUrl'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.linkedinUrl}
									placeholder='Facebook'
								/>
							</div>
							<span>{touched.linkedinUrl && errors.linkedinUrl}</span>

							<button className='submit-btn' type='submit'>
								Submit
							</button>
						</form>
					)}
				</Formik>
			</section>
		</HeaderBackoffice>
	);
};

export default MembersForm;

MembersForm.propTypes = {
	member: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		image: PropTypes.string,
		description: PropTypes.string,
		facebookUrl: PropTypes.string,
		linkedinUrl: PropTypes.string,
	}),
};
