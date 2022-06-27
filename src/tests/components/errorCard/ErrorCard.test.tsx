import { shallow } from 'enzyme';

import { ErrorCard } from '../../../components/ui';

describe('<ErrorCard />', () => {
  test('should match to snapshot', () => {
    const wrapper = shallow(<ErrorCard title="Error" detail="Server Error 500" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').exists()).toBeTruthy();
  });
});
