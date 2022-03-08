import { mount } from 'enzyme';
import { RadioGroup } from '../../../../components/forms';
import { genderRadio } from '../../../../utils/form/radioButtonsObjects';
import { renderWithProps } from '../../../fixtures/render';

const mockUseField = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useField: () => mockUseField(),
}));

describe('<RadioGroup />', () => {
  test('should render 2 radio buttons', () => {
    mockUseField.mockReturnValue([
      {
        value: 'M',
      },
    ]);
    const wrapper = mount(renderWithProps(RadioGroup, { radios: genderRadio }, {}));

    expect(wrapper.find('[type="radio"]').length).toEqual(genderRadio.length);
    expect(wrapper.find({ checked: true }).prop('value')).toBe('M');
  });
});
