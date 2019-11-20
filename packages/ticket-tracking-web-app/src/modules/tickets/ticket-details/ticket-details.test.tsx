import * as React from 'react';
import { shallow } from 'enzyme';
import TicketDetails from './ticket-details';

describe('<TicketDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<TicketDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
  