import { mount } from 'enzyme';

import { SlipButton } from '../../../components/ui';

describe('<SlipButton />', () => {
  test('should match to snapshot and disabled button when the loading is true', () => {
    const wrapper = mount(
      <SlipButton
        color="purple"
        icon="google"
        label="Google"
        loading
        onClick={() => {}}
      />,
    );
    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test('should enabled button when the loading is false', () => {
    const mockFn = jest.fn();

    const wrapper = mount(
      <SlipButton
        color="purple"
        icon="google"
        label="Google"
        loading={false}
        onClick={mockFn}
      />,
    );

    const button = wrapper.find('button');
    button.simulate('click');
    expect(button.prop('disabled')).toBe(false);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
