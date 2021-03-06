import { shallow } from 'enzyme';

import { Spinner } from '../../../components/ui';

describe('<Spinner />', () => {
  test('should match to snapshot', () => {
    const wrapper = shallow(<Spinner message="Cargando" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text().trim()).toBe('Cargando');
  });
});
