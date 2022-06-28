import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { mockStoreWithMiddlewares, renderWithProps } from '../../../../fixtures/render';
import { mockUpdateUser } from '../../../../fixtures/mockServer/mockUserHandler';
import { tutorApi } from '../../../../../redux/services/tutor.api';
import { PersonalDataForm } from '../../../../../components/profile';
import { userLogged } from '../../../../fixtures/testData/fakeAuthData';
import * as userApi from '../../../../../redux/user/user.api';

const server = setupServer(mockUpdateUser);
const storeRef = mockStoreWithMiddlewares();

const mockUseAppDispatch = jest.fn();

jest.mock('../../../../../redux/hooks', () => ({
  ...jest.requireActual('../../../../../redux/hooks'),
  useAppDispatch: () => mockUseAppDispatch,
}));

describe('<PersonalDataForm />', () => {
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
      wrapper = render(
        renderWithProps(
          PersonalDataForm,
          { user: userLogged.data, isUserLogged: true },
          { initialEntries: '/', store: storeRef.store },
        ),
      );
    });

    test('should show validation when input is empty', async () => {
      const { getByRole, getByLabelText, getByText } = wrapper;

      const button = getByRole('button', { name: /Cambiar Datos Personales/i });
      const inputName = getByLabelText(/Nombre/i);

      expect(button).toBeDisabled();

      if (inputName) {
        await waitFor(() => {
          fireEvent.change(inputName, { target: { value: '' }});
        });

        await waitFor(() => {
          fireEvent.blur(inputName);
        });
      }
      expect(inputName).toHaveClass('p-invalid');
      expect(getByText('Requerido')).toBeInTheDocument();
    });

    test('should user update correctly and call dispatch', async () => {
      const {
        getByLabelText, getByText, container,
      } = wrapper;

      const inputName = getByLabelText(/Nombre/i);
      const form = container.querySelector('form');

      if (inputName) {
        await waitFor(() => {
          fireEvent.change(inputName, { target: { value: 'Fernando Andres' }});
        });
      }

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(getByText('El usuario se actualizo con éxito')).toBeInTheDocument();
        expect(mockUseAppDispatch).toBeCalledTimes(1);
      });
    });

    test('should user update correctly and not call dispatch', async () => {
      const {
        getByLabelText, container,
      } = render(
        renderWithProps(
          PersonalDataForm,
          { user: userLogged.data, isUserLogged: false },
          { initialEntries: '/', store: storeRef.store },
        ),
      );

      const inputName = getByLabelText(/Nombre/i);
      const form = container.querySelector('form');

      if (inputName) {
        await waitFor(() => {
          fireEvent.change(inputName, { target: { value: 'Fernando Andres' }});
        });
      }

      if (form) {
        await waitFor(() => {
          fireEvent.submit(form);
        });
      }

      await waitFor(() => {
        expect(mockUseAppDispatch).toBeCalledTimes(0);
      });
    });
  });

  test('should send correctly object', async () => {
    const mockCalled = jest.fn();
    jest.spyOn(userApi, 'useUpdateUserMutation').mockImplementation(() => ([
      mockCalled,
      { loading: false, reset: jest.fn() },
    ]));

    const {
      getByLabelText, container,
    } = render(
      renderWithProps(
        PersonalDataForm,
        { user: userLogged.data, isUserLogged: true },
        { initialEntries: '/', store: storeRef.store },
      ),
    );

    const inputName = getByLabelText(/Nombre/i);
    const form = container.querySelector('form');

    if (inputName) {
      await waitFor(() => {
        fireEvent.change(inputName, { target: { value: 'Fernando Andres' }});
      });
    }

    if (form) {
      await waitFor(() => {
        fireEvent.submit(form);
      });
    }

    await waitFor(() => {
      expect(mockCalled).toHaveBeenCalledWith({
        id: userLogged.data.id,
        email: userLogged.data.email,
        gender: 'M',
        name: { first: 'Fernando Andres', last: 'lastTest' },
      });

      expect(mockUseAppDispatch).toBeCalledTimes(0);
    });
  });
});
