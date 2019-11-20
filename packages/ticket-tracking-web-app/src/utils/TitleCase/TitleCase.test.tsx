import * as React from 'react';
import { shallow } from 'enzyme';
import TitleCase from './TitleCase';

describe('<TitleCase />', () => {
  test('renders', () => {
    const wrapper = shallow(<TitleCase />);
    expect(wrapper).toMatchSnapshot();
  });
});
  