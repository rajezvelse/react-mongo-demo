import * as React from 'react';
import { shallow } from 'enzyme';
import CreateTicket from './create-ticket';

describe('<CreateTicket />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreateTicket />);
    expect(wrapper).toMatchSnapshot();
  });
});
  