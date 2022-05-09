import React from 'react';
import {
	screen,
	render,
	waitFor,
	cleanup,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsForm from './NewsForm';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
// Mocks para el llenado de los input
const dataToFillForm = {
	title: 'Example title',
	content: 'Example content',
	file: new File(['hello'], 'hello.png', { type: 'image/png' }),
	category: 'category example',
};
// Mock para las props del formulario
const newDataProp = {
	id: 2056,
	name: 'Editing title',
	content: 'Editing content',
	image: 'http://ongapi.alkemy.org/storage/t6yWaRCS0J.jpg',
	category_id: 200,
};
const categories = [{ id: 200, name: 'category example' }];

describe('Formulario de novedades', () => {
	let titleInput, contentInput, imageInput, selectInput, postBtn, updateBtn;
	// Validar que se puedan rellenar todos los campos del formuario corractamente
	describe('Crear novedades', () => {
		beforeEach(async () => {
			axios.get.mockImplementationOnce(() =>
				Promise.resolve({ data: { data: categories } })
			);
			axios.post.mockReturnValueOnce({ success: true });
			render(
				<BrowserRouter>
					<NewsForm />
				</BrowserRouter>
			);
			await waitFor(() => {
				screen.getByRole('option', {
					name: 'category example',
				});
			});
			titleInput = screen.getByTestId('titulo');
			contentInput = screen.getByLabelText('Rich Text Editor, main');
			imageInput = screen.getByTestId('image');
			selectInput = screen.getByTestId('categoria');
			postBtn = screen.getByText('Send');
		});
		afterEach(() => {
			cleanup();
			axios.get.mockClear();
		});

		it('Deberia mostar un error si los campos no estan completos', async () => {
			user.click(postBtn);
			await waitFor(() => {
				expect(screen.getByText('El titulo es requerido')).toBeInTheDocument();
				expect(
					screen.getByText('El contenido es requerido')
				).toBeInTheDocument();
				expect(screen.getByText('La imagen es requerida')).toBeInTheDocument();
			});
		});
		it('Deberia escribir en los campos y mostrarlo correctamente', async () => {
			const categoryOption = screen.getByRole('option', {
				name: 'category example',
			});
			user.type(titleInput, dataToFillForm.title);
			user.type(contentInput, dataToFillForm.content);
			await act(async () => {
				user.upload(imageInput, dataToFillForm.file);
				user.selectOptions(selectInput, categoryOption);
			});
			await waitForElementToBeRemoved(() =>
				screen.queryByText('La imagen es requerida')
			);
			expect(titleInput).toHaveValue(dataToFillForm.title);
			expect(contentInput.textContent).toBe(dataToFillForm.content);
			expect(imageInput.files[0]).toStrictEqual(dataToFillForm.file);
			expect(categoryOption.selected).toBe(true);
			expect(screen.queryByText('Example content')).toBeInTheDocument();
			user.click(postBtn);
		});
	});

	/* 
		El formulario deberá renderizarce con los datos que le fueron pasados por props
	 	y al presionar el boton de "Update" mostrar el mensaje de que fueron guardados exitosamente
	*/
	describe('Editar novedades', () => {
		beforeEach(async () => {
			const patchResponse = { data: { success: true } };
			axios.put.mockReturnValueOnce(patchResponse);
			axios.get.mockImplementationOnce(() =>
				Promise.resolve({ data: { data: categories } })
			);
			render(
				<BrowserRouter>
					<NewsForm news={newDataProp} />
				</BrowserRouter>
			);
			await waitFor(() => {
				screen.getByText('Formulario de novedades');
			});
			titleInput = screen.getByTestId('titulo');
			contentInput = screen.getByLabelText('Rich Text Editor, main');
			imageInput = screen.getByTestId('image');
			selectInput = screen.getByTestId('categoria');
			updateBtn = screen.getByText('Update');
		});

		afterEach(() => {
			cleanup();
		});

		it('Deberia renderizar el formularios con los datos correctos para editar y guardarlos correctamente', async () => {
			expect(titleInput).toHaveValue(newDataProp.name);
			expect(contentInput.textContent).toBe(newDataProp.content);
			expect(selectInput).toHaveValue(String(newDataProp.category_id));
			await act(async () => {
				user.click(updateBtn);
			});
			await waitFor(() => {
				expect(screen.getByText('Editado correctamente')).toBeInTheDocument();
				expect(axios.put).toHaveBeenCalled();
				console.log(axios.put.getMockImplementation());
			});
		});
	});
});
