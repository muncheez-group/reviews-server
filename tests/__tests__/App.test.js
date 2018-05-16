import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../client/index.jsx'

Enzyme.configure({ adapter: new Adapter() });

describe('App Parent Component', () => {
  const wrapper = shallow(
    <App/>
  );

  test('should render App', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have 2 child components', () => {
    console.log(wrapper.children())
    expect(wrapper.children().length).toBe(2);
  });

});
