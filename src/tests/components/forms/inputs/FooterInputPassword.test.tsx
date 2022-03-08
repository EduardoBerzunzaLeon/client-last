import { shallow } from 'enzyme';
import { FooterInputPassword } from '../../../../components/forms';

describe('<FooterInputPassword />', () => {
  test('should match to snapshot', () => {
    const wrapper = shallow(<FooterInputPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
