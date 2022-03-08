import { mount } from 'enzyme';

import { GoogleButton } from '../../../components/googleButton/GoogleButton';
import { render, Wrapper } from '../../fixtures/render';

const mockSignInWithSocialMutation = jest.fn();

jest.mock('../../../redux/auth/auth.api', () => ({
  ...jest.requireActual('../../../redux/auth/auth.api'),
  useSignInWithSocialMutation: () => [
    mockSignInWithSocialMutation(),
    {
      isLoading: false,
    },
  ],
}));

describe('<GoogleButton />', () => {
  let wrapper: Wrapper;
  beforeEach(() => {
    wrapper = mount(render(GoogleButton));
  });

  test('should math to snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call signInSocial mutation', () => {
    wrapper.find('.button-slip').last().simulate('click');
    expect(mockSignInWithSocialMutation).toHaveBeenCalledTimes(1);
  });
});
