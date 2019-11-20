import * as React from 'react';
import { shallow } from 'enzyme';
import TicketsList from './tickets-list';

describe('<TicketsList />', () => {
  test('renders', () => {
    const wrapper = shallow(<TicketsList />);
    expect(wrapper).toMatchSnapshot();
  });
});
  