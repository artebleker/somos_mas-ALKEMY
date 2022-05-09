import React from 'react';
import RegisterForm from './RegisterForm';
import {
	render,
	fireEvent,
	waitFor,
	screen
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createUser } from '../../Services/UsersHTTPService';
import '@testing-library/jest-dom/extend-expect';

// Documentacion

// Lo que hago: Ingreso los datos necesarios para el registro
// Lo que espero que haga: Si los datos estan correctos, debe pasar el test
// Contexto: Brave
// Ultima vez que ejecute el test: 19/4/2022

describe('register', () => {
	describe('los inputs son validos', () => {
		it('llama ala funcion de onSubmit', async () => {
			const mockOnSubmit = jest.fn();
			const { getByText } = render(
				<RegisterForm onSubmit={mockOnSubmit} />
			);

			await act(async () => {
				fireEvent.change(screen.getByPlaceholderText('Nombre'), {
					target: { value: 'ezequiel' },
				});

				fireEvent.change(screen.getByPlaceholderText('Email'), {
					target: { value: 'ezequiel@gmail.com' },
				});

				fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
					target: { value: '65E9as.' },
				});

				fireEvent.change(
					screen.getByPlaceholderText('Confirme su contraseña'),
					{
						target: { value: '65E9as.' },
					}
				);
			});

			await waitFor(async () => {
				fireEvent.click(getByText('Registrarse'));
			});

			waitFor(() => {
				expect(mockOnSubmit).toHaveBeenCalled();
				expect(createUser(data).toHaveBeenCalled());
			});
		});
	});

	describe('el nombre es obligatorio', () => {
		it('mostrar validacion de errores de email', async () => {
			const { getByPlaceholderText, container } = render(<RegisterForm />);
			await act(async () => {
				const emailInput = getByPlaceholderText('Nombre');
				fireEvent.change(emailInput, {
					target: { value: '' },
				});
				fireEvent.blur(emailInput);
			});

			waitFor(() => {
				expect(container.innerHTML).toMatch('El nombre es obligatorio');
			});
		});
	});

	describe('email incorrecto', () => {
		it('mostrar validacion de errores de email', async () => {
			const { getByPlaceholderText, container } = render(<RegisterForm />);
			await act(async () => {
				const emailInput = getByPlaceholderText('Email');
				fireEvent.change(emailInput, {
					target: { value: 'rulo' },
				});
				fireEvent.blur(emailInput);
			});

			waitFor(() => {
				expect(container.innerHTML).toMatch('Escriba un correo válido');
			});
		});
	});

	describe('la contraseña es incorrecta', () => {
		it('mostrar validacion de errores de email', async () => {
			const { getByPlaceholderText, container } = render(<RegisterForm />);
			await act(async () => {
				const emailInput = getByPlaceholderText('Contraseña');
				fireEvent.change(emailInput, {
					target: { value: '123456' },
				});
				fireEvent.blur(emailInput);
			});

			waitFor(() => {
				expect(container.innerHTML).toMatch(
					'La contraseña debe terner mínimo 6 caracteres, contener una mayúscula, un número y un carácter especial'
				);
			});
		});
	});

	// fin
});

const data = {
	name: 'ezequiel',
	email: 'Ezequiel@gmail.com',
	password: '65E9as.',
};
