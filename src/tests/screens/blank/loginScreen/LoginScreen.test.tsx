import {
  render, fireEvent, wait, RenderResult,
} from '@testing-library/react';

import { mount } from 'enzyme';
import { renderWithRouter, Wrapper } from '../../../fixtures/render';
import LoginScreen from '../../../../screens/blank/loginScreen/LoginScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<LoginComponent />', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(renderWithRouter(LoginScreen, { initialEntries: '/admin' }));
    jest.clearAllMocks();
  });

  test('should render correctly LoginScreenComponent', () => {
    const wrapperEnzyme = mount(renderWithRouter(LoginScreen, { initialEntries: '/admin' }));
    expect(wrapperEnzyme.find('input').length).toBe(2);
    expect(wrapperEnzyme.find('input[name="email"]').prop('value')).toBe('');
    expect(wrapperEnzyme.find('input[name="password"]').prop('value')).toBe('');
    expect(wrapperEnzyme.find('GoogleButton').exists()).toBe(true);
    expect(wrapperEnzyme.find('FacebookButton').exists()).toBe(true);
    expect(wrapperEnzyme.find('Link').first().props()).toEqual({ to: '/forgot-password', children: '¿Olvidaste la contraseña?' });
    expect(wrapperEnzyme.find('Link').last().props()).toEqual({ to: '/register', children: 'No tengo cuenta' });
  });

  // test send form when send empty data show an error and is correctly data call login redux

  //   test('Should show and error when the inputs are emtpy and call login method when is successful', () => {
  //     wrapper.find('form').prop('onSubmit')!(({ preventDefault() {} }) as any);
  //     console.log(wrapper.find('input[name="email"]').props());
  //   });

  //   const { getByLabelText, getByTestId } = render(<App />);
  //   const input = getByLabelText("Email");
  //   fireEvent.blur(input);
  //   await wait(() => {
  //     expect(getByTestId("emailError")).not.toBe(null);
  //     expect(getByTestId("emailError")).toHaveTextContent("Required");
  //   });

  // mock the feth useLoginMutation and enter to email not activated and redirect to /send-email-verify
});
