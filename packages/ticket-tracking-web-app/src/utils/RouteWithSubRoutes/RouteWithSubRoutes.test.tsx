import * as React from 'react';
import { shallow } from 'enzyme';
import RouteWithSubRoutes from './RouteWithSubRoutes';

describe('<RouteWithSubRoutes />', () => {
  test('renders', () => {
    const wrapper = shallow(<RouteWithSubRoutes />);
    expect(wrapper).toMatchSnapshot();
  });
});
  