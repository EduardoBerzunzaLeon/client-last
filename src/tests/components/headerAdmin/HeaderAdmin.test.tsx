import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<HeaderAdmin />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should first', () => {
    const wrapper = mount(
      <MemoryRouter>
        <HeaderAdmin
          position="users/profile"
          title="Personal Information"
        />
      </MemoryRouter>,
    );

    const link = wrapper.find('a').at(0);

    link.simulate('click');

    expect((wrapper.find('BreadCrumb').prop('model') as []).length).toBe(2);
    expect(wrapper.find('h2').text().trim()).toBe('Personal Information');
    expect(mockNavigate).toBeCalledWith('/admin');
  });
});
