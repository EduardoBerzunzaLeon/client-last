import fetchMock from 'jest-fetch-mock';
import {
  cleanup, render, RenderResult, waitFor, fireEvent,
} from '@testing-library/react';
import { setupServer } from 'msw/node';

import { mockGetStudents, studentsDataMock } from '../../../fixtures/mockServer/mockStudentHandler';
import { mockStoreWithMiddlewares, renderWithRouter } from '../../../fixtures/render';
import { StudentsScreen } from '../../../../screens/admin/students/StudentsScreen';
import { tutorApi } from '../../../../redux/services/tutor.api';

// carguen los datos correctamente (la tabla)
// que los filtros funcionen (que llamen el endpoint correctamente) y eliminar filtros
// Crear un estudiante nuevo
// Actualizar un estudiante

const server = setupServer(mockGetStudents);
const storeRef = mockStoreWithMiddlewares();

const mockLocation = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
  useNavigate: () => mockNavigate,
}));

describe('<StudentScreen />', () => {
  let wrapper: RenderResult;
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.mockReturnValue({ state: null });
    wrapper = render(
      renderWithRouter(
        StudentsScreen,
        { initialEntries: '/admin/students', store: storeRef.store },
      ),
    );
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    storeRef.store.dispatch(tutorApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  test('should render correctly the studens Screen', async () => {
    const {
      queryByText,
      container,
      getByPlaceholderText,
    } = wrapper;

    expect(queryByText(/Cargando Alumnos/i)).toBeInTheDocument();

    await waitFor(() => {
      const amountStudents = studentsDataMock.data.length;
      const tbodyRows = container.querySelectorAll('tbody > tr');
      expect(queryByText(/Cargando/i)).not.toBeInTheDocument();
      expect(tbodyRows.length).toBe(amountStudents);
      expect(queryByText('Limpiar Filtros')?.closest('button')).toBeInTheDocument();
      expect(queryByText('Crear Estudiante')?.closest('button')).toBeInTheDocument();
      expect(queryByText(/Exportar/i)?.closest('button')).toBeInTheDocument();
      expect(getByPlaceholderText(/Búsqueda Global/i)).toBeInTheDocument();

      const firstCellValue = tbodyRows[0].children.item(0)?.textContent;

      expect(firstCellValue).toBe(studentsDataMock.data[0].enrollment);

      const amountOfButtons = tbodyRows[0].querySelectorAll('button').length;
      expect(amountOfButtons).toBe(5);
    });
  });

  test('should redirect to profile with root as students', async () => {
    const {
      container,
    } = wrapper;

    await waitFor(async () => {
      const tbodyRows = container
        .querySelectorAll('tbody > tr')[0]
        .querySelectorAll('button')[0];

      expect(tbodyRows).toBeInTheDocument();

      if (tbodyRows) {
        await waitFor(() => {
          fireEvent.click(tbodyRows);
        });
      }

      expect(mockNavigate).toHaveBeenCalledWith(
        `/admin/users/${studentsDataMock.data[0].id}`,
        { state: { root: 'students' }},
      );
    });
  });
});
