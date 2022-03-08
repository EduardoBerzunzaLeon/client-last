import { mount } from 'enzyme';
import BlankLayout from '../../../../screens/blank/layout/BlankLayout';
import { renderWithRouter } from '../../../fixtures/render';

describe('<BlankLayout />', () => {
  test('should render corrrectly with outlet component', () => {
    const wrapper = mount(renderWithRouter(BlankLayout, {}));
    expect(wrapper.find('Outlet').exists()).toBe(true);
  });
});
