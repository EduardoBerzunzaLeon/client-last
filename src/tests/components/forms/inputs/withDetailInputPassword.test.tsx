import { mount } from 'enzyme';
import { Formik } from 'formik';

import { InputTextApp, withDetailInputPassword } from '../../../../components/forms';

describe('<withDetailInputPassword />', () => {
  test('should match to snapshot and input password must have footerinputpassword props', async () => {
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

    // ? is necessary in change event formik
    // https://medium.com/@jorgeortega/react-forms-with-formik-and-unit-testing-with-react-testing-library-e2dda1a899db
    // const password = container.querySelector('input[name="password"]');
    // if (password) {
    //   await waitFor(() => {
    //     fireEvent.change(password, {
    //       target: {
    //         value: 'mockpassword',
    //       },
    //     });
    //   });
    // }

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Password').props()).toEqual(expect.objectContaining({
      promptLabel: 'Ingresa una contraseña',
      weakLabel: 'Débil',
      mediumLabel: 'Moderada',
      strongLabel: 'Difícil',
      type: 'password',
    }));
  });
});
