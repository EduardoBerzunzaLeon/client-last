import { mount } from 'enzyme';
import { RadioButtonApp } from '../../../../components/forms';
import { genderRadio } from '../../../../utils/forms/radioButtonObjects';
import { renderWithProps } from '../../../fixtures/render';

const mockUseField = jest.fn();
const male = { ...genderRadio[0] };

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useField: () => mockUseField(),
}));

describe('<RadioGroup />', () => {
  test('should render 2 radio buttons', () => {
    mockUseField.mockReturnValue([
      {
        value: 'F',
      },
    ]);
    const wrapper = mount(renderWithProps(RadioButtonApp, { ...male }, {}));

    expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
    expect(wrapper.find({ 'aria-checked': true }).exists()).toBe(false);
    expect(wrapper.find('label').text().trim()).toEqual(male.label);
  });
});
