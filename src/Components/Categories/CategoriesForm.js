import React, { useState } from 'react';
import '../FormStyles.css';
import HeaderBackoffice from '../HeaderBackoffice/HeaderBackoffice';

const CategoriesForm = () => {
	const [initialValues, setInitialValues] = useState({
		name: '',
		description: '',
	});

	const handleChange = e => {
		if (e.target.name === 'name') {
			setInitialValues({ ...initialValues, name: e.target.value });
		}
		if (e.target.name === 'description') {
			setInitialValues({ ...initialValues, description: e.target.value });
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(initialValues);
	};

	return (
		<HeaderBackoffice>
			<section className='form__section form__backoffice'>
				<form className='form-container' onSubmit={handleSubmit}>
					<header>Formulario de categorias</header>
					<div className='input__container'>
						<input
							className='input-field'
							type='text'
							name='name'
							value={initialValues.name}
							onChange={handleChange}
							placeholder='Title'
						></input>
					</div>
					<div className='input__container'>
						<input
							className='input-field'
							type='text'
							name='description'
							value={initialValues.description}
							onChange={handleChange}
							placeholder='Write some description'
						></input>
					</div>
					<button className='submit-btn' type='submit'>
						Send
					</button>
				</form>
			</section>
		</HeaderBackoffice>
	);
};

export default CategoriesForm;
