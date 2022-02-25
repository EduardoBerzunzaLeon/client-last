import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';

describe('<App /> Tests', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('Should render <App/> correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render a div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(1);
  });
});
