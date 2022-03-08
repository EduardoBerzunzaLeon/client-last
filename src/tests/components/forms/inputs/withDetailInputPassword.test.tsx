import { mount } from 'enzyme';
import { Formik } from 'formik';
import { InputTextApp, withDetailInputPassword } from '../../../../components/forms';

const mockUseField = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useField: () => mockUseField(),
}));

describe('<FooterInputPassword />', () => {
  test('should match to snapshot', async () => {
    mockUseField.mockReturnValue([
      { value: '' },
      { error: false, touched: false },
    ]);
    const InputPassword = withDetailInputPassword(InputTextApp);

    const wrapper = mount(
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={() => {}}
      >
        {() => (
          <InputPassword
            label="Contraseña"
            name="password"
            className="w-full"
          />
        )}
      </Formik>,
    );

    // const input = wrapper.find('Password');
    // input.simulate('click');
    const input = wrapper.find('input');

    console.log(input.props());
    input.props()
      .onInput({ target: { value: 'American Sign Language', name: 'clientsData.language1_id' }});

    wrapper.update();
    console.log(input.props());
    // await expect(wrapper.find('Divider').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
