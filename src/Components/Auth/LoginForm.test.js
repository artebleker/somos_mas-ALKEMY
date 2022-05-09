import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { act } from 'react-dom/test-utils';
import loginUser from '../../Services/UsersHTTPService';

// Doc LoginForm test
// El test verifica en primera instancia que el componente haga el llamado de a función submit si los datos son correctos
// El test verifica que los campos email y password muestren el mensaje de error si los datos son incorrectos y por ultimo que haga la peticion http

describe('LoginForm', () => {
	describe('valid inputs', () => {
		it('should call the submit function', async () => {
			const onSubmit = jest.fn();
			const { getByPlaceholderText, getByRole } = render(
				<LoginForm onSubmit={onSubmit} />
			);
			const emailInput = getByPlaceholderText('Email');
			const passwordInput = getByPlaceholderText('Contraseña');
			const submitButton = getByRole('button');
			await act(async () => {
				fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
				fireEvent.change(passwordInput, { target: { value: '123456' } });
			});
			await act(async () => {
				fireEvent.click(submitButton);
			});
			waitFor(() => {
				expect(onSubmit).toHaveBeenCalled();
			});
		});
	});
	describe('invalid email', () => {
		it('should show an error message', async () => {
			const { getByPlaceholderText, container } = render(<LoginForm />);
			const emailInput = getByPlaceholderText('Email');
			await act(async () => {
				fireEvent.change(emailInput, {
					target: { value: 'test invalid email' },
				});
				fireEvent.blur(emailInput);
			});
            waitFor(() => {
                expect(container.querySelector('.error-message-form')).toHaveTextContent('Escriba un correo válido');
            });
		});
	});
	describe('invalid password', () => {
		it('should show an error message', async() => {
            const { getByPlaceholderText, container } = render(<LoginForm />);
			const passwordInput = getByPlaceholderText('Contraseña');
			await act(async () => {
				fireEvent.change(passwordInput, {
					target: { value: '123' },
				});
				fireEvent.blur(passwordInput);
			});
			waitFor(() => {
				expect(container.querySelector('.error-message-form')).toHaveTextContent('La contraseña debe terner mínimo 6 caracteres, contener una mayúscula, un número y un carácter especial');
			});
        });
	});
});
test('mocAxios post loginUser', () => {
    const mockResponse = {
        data: {
            token: 'token',
            user: {
                id: 1,
                name: 'test',
                email: 'test@test.com',
                password: '123456',
                role: 'admin'
            }
        }
    };
    const mockPost = jest.fn().mockResolvedValue(mockResponse);
    loginUser.post = mockPost;
    const mockUser = {
        email: 'test@test.com',
        password: '123456'
    };
    return loginUser.post(mockUser).then(response => {
        expect(response.data.token).toBe('token');
        expect(response.data.user.id).toBe(1);
        expect(response.data.user.name).toBe('test');
        expect(response.data.user.email).toBe('test@test.com');
        expect(response.data.user.password).toBe('123456');
        expect(response.data.user.role).toBe('admin');
    });
});