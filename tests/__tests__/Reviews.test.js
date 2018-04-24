import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import Reviews from '../../client/components/Reviews';

Enzyme.configure({ adapter: new Adapter() });



describe('Reviews', () => {
  let wrapper;
  // beforeEach(() => { wrapper = shallow(<Reviews />)});

  it('renders without crashing', () => {
   const div = document.createElement('div'); // create the div here
   ReactDOM.render(<Reviews />, div);
  });
  //
  // it('should be defined', () => {
  //   expect(Reviews).toBeDefined();
  // });
  // it('should render one Reviews component', () => {
  //   expect(wrapper).toHaveLength(1);
  // });
  // it('should render props correctly', () => {
  //   expect(wrapper.instance().state.isLoaded).toBe(true);
  // });
});
