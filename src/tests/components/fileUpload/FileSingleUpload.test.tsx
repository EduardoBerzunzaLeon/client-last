import fetchMock from 'jest-fetch-mock';
import { setupServer } from 'msw/node';
import {
  cleanup,
  fireEvent,
  waitFor,
  RenderResult,
  render,
} from '@testing-library/react';

import { storeGeneric, renderWithProps } from '../../fixtures/render';
import { tutorApi } from '../../../redux/services/tutor.api';

import { mockUploadAvatar } from '../../fixtures/mockServer/mockUserHandler';
import { ProfileImageForm } from '../../../screens/admin/profile/components/ProfileImageForm';

const server = setupServer(mockUploadAvatar);
const storeRef = storeGeneric;
const fakeFile = new File([ 'avatar' ], 'chucknorris.png', { type: 'image/png' });
const mockCreateObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;

describe('<FileSingleUpload />', () => {
  let wrapper: RenderResult;

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    wrapper = render(
      renderWithProps(
        ProfileImageForm,
        { accept: 'image/*' },
        { initialEntries: '/', store: storeRef.store },
      ),
    );
    mockCreateObjectURL.mockReturnValue('chucknorris.png');
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
    storeRef.store.dispatch(tutorApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  test('should render without images, select and delete file without upload', async () => {
    const {
      getByText, getByRole, getAllByRole, queryByRole, container,
    } = wrapper;

    const inputFile = container.querySelector('input[type="file"]');

    expect(getByText(/Arrastre la imagen aqui/i)).toBeInTheDocument();
    expect(queryByRole('presentation')).not.toBeInTheDocument();

    // ?  Select File
    if (inputFile) {
      await waitFor(() => {
        fireEvent.change(inputFile, {
          target: { files: [ fakeFile ]},
        });
      });
    }

    const imagen = getByRole('presentation');
    expect(imagen).toHaveAttribute('src', 'chucknorris.png');

    // ? Delete File
    const deleteButton = getAllByRole('button').at(1);

    if (deleteButton) {
      await waitFor(() => {
        fireEvent.click(deleteButton);
      });
    }

    expect(queryByRole('presentation')).not.toBeInTheDocument();
  });

  test('should uploadFile correctly and disabled uploadButton', async () => {
    const {
      getAllByRole, queryByText, container,
    } = wrapper;

    const inputFile = container.querySelector('input[type="file"]');
    // ? Upload file
    if (inputFile) {
      await waitFor(() => {
        fireEvent.change(inputFile, {
          target: { files: [ fakeFile ]},
        });
      });
    }

    const uploadButton = getAllByRole('button').at(0);

    if (uploadButton) {
      await waitFor(() => {
        fireEvent.click(uploadButton);
      });
    }

    await waitFor(() => {
      expect(queryByText(/La foto de perfil se actualizó con éxito/i)).toBeInTheDocument();
    });

    expect(uploadButton).toHaveAttribute('disabled');
  });
});
