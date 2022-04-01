import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { mockStoreWithMiddlewares, renderWithRouter } from '../../../fixtures/render';
import { mockGetUser, mockUpdateUser } from '../../../fixtures/mockServer/mockUserHandler';
import { tutorApi } from '../../../../redux/services/tutorApi';
import { userLogged } from '../../../fixtures/testData/fakeAuthData';
import ProfileScreen from '../../../../screens/admin/profile/ProfileScreen';

const server = setupServer(mockGetUser, mockUpdateUser);
const storeRef = mockStoreWithMiddlewares();

const mockParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams(),
}));

describe('<ProfileScreen />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    storeRef.store.dispatch(tutorApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  describe('PersonalDataForm component without mock hook', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      mockParams.mockReturnValue({ id: userLogged.data.id });
      wrapper = render(
        renderWithRouter(
          ProfileScreen,
          { initialEntries: '/admin/users/:id', store: storeRef.store },
        ),
      );
    });

    test('should show loader and then render correctly', async () => {
      const {
        queryByText, container, getAllByRole, getByRole,
      } = wrapper;

      expect(queryByText(/Cargando Usuario/i)).toBeInTheDocument();

      await waitFor(() => {
        expect(getAllByRole('separator').length).toBe(6);
        expect(getByRole('img', { hidden: true })).toHaveStyle('display: none');
        expect(container.querySelectorAll('.custom-badge').length).toBe(2);
        expect(queryByText(userLogged.data.fullname)).toBeInTheDocument();
        expect(queryByText(userLogged.data.email)).toBeInTheDocument();
        expect(queryByText(userLogged.data.role)).toBeInTheDocument();
        expect(queryByText('Hombre')).toBeInTheDocument();
      });

      const imagen = getByRole('img', { hidden: true });
      fireEvent.load(imagen);
      fireEvent.error(imagen);

      await waitFor(() => {
        expect(container.querySelector('img')?.src).toBe('http://localhost/assets/images/profile.png');
      });
    });

    test('should show modal and when change personal data should modified the card', async () => {
      const {
        queryByText,
        getByRole,
        queryAllByRole,
      } = wrapper;

      await waitFor(() => {
        expect(queryByText(/Cargando Usuario/i)).not.toBeInTheDocument();
      });

      const button = getByRole('button', { name: /Editar Perfil/i });

      await waitFor(() => {
        fireEvent.click(button);
      });

      const inputName = getByRole('textbox', { name: 'Nombre*' });

      const buttonSubmit = getByRole('button', { name: /Cambiar Datos/i });

      expect(inputName).toHaveAttribute('value', userLogged.data.name.first);
      expect(queryAllByRole('tab').length).toBe(2);
      expect(getByRole('dialog')).toBeInTheDocument();

      if (inputName) {
        await waitFor(() => {
          fireEvent.change(inputName, { target: { value: 'Fernando Andres' }});
        });
      }

      await waitFor(() => {
        fireEvent.click(buttonSubmit);
      });

      await waitFor(() => {
        expect(queryByText(/Fernando Andres/i)).toBeInTheDocument();
      });
    });
  });

  test('should show a error card', async () => {
    mockParams.mockReturnValue({ id: 'noValidId' });

    const {
      queryByText,
      getByRole,
    } = render(
      renderWithRouter(
        ProfileScreen,
        { initialEntries: '/admin/users/:id', store: storeRef.store },
      ),
    );

    await waitFor(() => {
      expect(queryByText(/Nuestro perrito se comio la infomación,/i)).toBeInTheDocument();
      expect(getByRole('img')).toHaveAttribute('src', '/assets/images/error404.png');
    });
  });
});
