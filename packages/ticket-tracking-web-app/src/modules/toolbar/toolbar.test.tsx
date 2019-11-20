import * as React from 'react';
import { shallow } from 'enzyme';
import Toolbar from './toolbar';

describe('<Toolbar />', () => {
  test('renders', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
  