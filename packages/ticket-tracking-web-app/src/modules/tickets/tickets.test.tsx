import * as React from 'react';
import { shallow } from 'enzyme';
import Tickets from './tickets';

describe('<Tickets />', () => {
  test('renders', () => {
    const wrapper = shallow(<Tickets />);
    expect(wrapper).toMatchSnapshot();
  });
});
  