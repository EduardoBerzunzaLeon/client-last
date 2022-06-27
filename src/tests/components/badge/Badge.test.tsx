import { shallow } from 'enzyme';
import { Badge } from '../../../components/ui';

describe('<Badge />', () => {
  test('should render correctly', () => {
    const text = 'active';
    const match = 'true';
    const matchObject = {
      true: 'success',
      false: 'danger',
    };

    const wrapper = shallow(<Badge
      text={text}
      matchObject={{
        true: 'success',
        false: 'danger',
      }}
      match={match}
    />);

    const span = wrapper.find('span');
    expect(span.text().trim()).toBe(text);
    expect(span.prop('className')).toEqual(expect.stringContaining(matchObject[match]));
  });
});
