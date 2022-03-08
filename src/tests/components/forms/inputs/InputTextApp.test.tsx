import { mount } from 'enzyme';
import { Formik } from 'formik';

import { InputTextApp } from '../../../../components/forms';

const mockUseField = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useField: () => mockUseField(),
}));

describe('<InputTextApp />', () => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  test('should render an input text without error', () => {
    mockUseField.mockReturnValue([
      { value: 'testing' },
      { error: false, touched: false },
    ]);

    const wrapper = mount(
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={() => {}}
      >
        {() => (
          <InputTextApp
            label="Email"
            name="email"
            keyfilter="email"
            className="w-full"
            icon="pi pi-envelope"
            autoFocus
          />
        )}
      </Formik>,
    );

    expect(wrapper.find('input').props()).toEqual(expect.objectContaining({ name: 'email', type: 'text', value: 'testing' }));
    expect(wrapper.find('.p-error').exists()).toBe(false);
  });

  test('should render an input password with error', () => {
    mockUseField.mockReturnValue([
      { value: 'testing' },
      { error: true, touched: true },
    ]);

    const wrapper = mount(
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={() => {}}
      >
        {() => (
          <InputTextApp
            label="Contraseña"
            name="password"
            type="password"
            className="w-full"
            toggleMask
            feedback={false}
          />
        )}
      </Formik>,
    );

    expect(wrapper.find('input').props()).toEqual(expect.objectContaining({ name: 'password', type: 'password', value: 'testing' }));
    expect(wrapper.find('.p-error').exists()).toBe(true);
  });
});
