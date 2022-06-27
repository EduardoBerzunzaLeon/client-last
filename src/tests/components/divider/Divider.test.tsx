import { shallow } from 'enzyme';
import { Divider } from '../../../components/ui';

describe('<Divider />', () => {
  test('should match to snapshot', () => {
    const wrapper = shallow(<Divider text="Name" icon="user" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('i').prop('className')).toContain('pi-user');
    expect(wrapper.find('b').text().trim()).toContain('Name');
  });
});
