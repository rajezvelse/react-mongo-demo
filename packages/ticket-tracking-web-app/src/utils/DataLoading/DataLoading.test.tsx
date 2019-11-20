import * as React from 'react';
import { shallow } from 'enzyme';
import DataLoading from './DataLoading';

describe('<DataLoading />', () => {
  test('renders', () => {
    const wrapper = shallow(<DataLoading />);
    expect(wrapper).toMatchSnapshot();
  });
});
  