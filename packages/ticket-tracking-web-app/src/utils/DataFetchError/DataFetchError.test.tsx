import * as React from 'react';
import { shallow } from 'enzyme';
import DataFetchError from './DataFetchError';

describe('<DataFetchError />', () => {
  test('renders', () => {
    const wrapper = shallow(<DataFetchError />);
    expect(wrapper).toMatchSnapshot();
  });
});
  