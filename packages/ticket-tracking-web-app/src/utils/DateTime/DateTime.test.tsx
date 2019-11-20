import * as React from 'react';
import { shallow } from 'enzyme';
import DateTime from './DateTime';

describe('<DateTime />', () => {
  test('renders', () => {
    const wrapper = shallow(<DateTime />);
    expect(wrapper).toMatchSnapshot();
  });
});
  