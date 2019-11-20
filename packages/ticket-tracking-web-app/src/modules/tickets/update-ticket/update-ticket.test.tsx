import * as React from 'react';
import { shallow } from 'enzyme';
import UpdateTicket from './update-ticket';

describe('<UpdateTicket />', () => {
  test('renders', () => {
    const wrapper = shallow(<UpdateTicket />);
    expect(wrapper).toMatchSnapshot();
  });
});
  